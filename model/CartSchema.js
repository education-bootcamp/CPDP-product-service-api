const mongoose = require('mongoose');
const CartSchema
    = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    productId:{
        type:Object
    },
    qty:{
        type:Number
    },
    createdDate:{
        type:Date
    }
});
module.exports = mongoose.model('carts',CartSchema);