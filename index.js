const express = require('express');
const mongoose = require('mongoose');
const Eureka = require('eureka-js-client').Eureka;
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

const serverPort = process.env.SERVER_PORT | 3000;

//====================
const CategoryRoute = require('./route/CategoryRoute');
const CountryRoute = require('./route/CountryRoute');
const DiscountRoute = require('./route/DiscountRoute');
const ProductRoute = require('./route/ProductRoute');
const CartRoute = require('./route/CartRoute');
const BookmarkRoute = require('./route/BookmarkRoute');
const ReviewRoute = require('./route/ReviewRoute');
//====================

/*===============================*/
const eurekaClient = new Eureka({
    instance: {
        app: 'product-service-api',
        instanceId: `product-service-api:${serverPort}`,
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        port: {
            '$': parseInt(serverPort),
            '@enabled': true
        },
        vipAddress: 'product-service-api',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn'
        }
    },
    eureka: {
        host: '127.0.0.1',
        port: 8761,
        servicePath: '/eureka/apps/'
    }
});
eurekaClient.start(function (error){
    console.log(error || 'eureka registration is complete!')
})
/*===============================*/

try {
    mongoose.connect(`${process.env.DB_URL}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
    app.listen(serverPort, () => {
        console.log(`Server up & running on port ${serverPort}`);
    })
} catch (e) {
    console.log(e);
}
app.get('/test-api', (req, resp) => {
    return resp.json({'message': 'Hi the Server is Working....'})
});

// http://localhost:3000/api/v1/categories/create-category (POST)
//===================
app.use('/api/v1/categories', CategoryRoute);
app.use('/api/v1/countries', CountryRoute);
app.use('/api/v1/discounts', DiscountRoute);
app.use('/api/v1/products', ProductRoute);
app.use('/api/v1/carts', CartRoute);
app.use('/api/v1/bookmarks', BookmarkRoute);
app.use('/api/v1/reviews', ReviewRoute);
//===================