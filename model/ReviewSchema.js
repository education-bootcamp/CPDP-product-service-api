const mongoose = require('mongoose');
const ReviewSchema
    = new mongoose.Schema({
    orderId:{
        type:Object
    },
    message:{
        type:String
    },
    createdDate:{
        type:Date
    },
    userId:{
        type:Object
    },
    displayName:{
        type:String
    },
    productId:{
        type:Object
    },
    ratings:{
        type:Number
    }
});
module.exports = mongoose.model('review',ReviewSchema);