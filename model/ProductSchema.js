const mongoose = require('mongoose');
const ProductSchema
    = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    images:{
        type:Array
    },
    actualPrice:{
        type:Number
    },
    oldPrice:{
        type:Number
    },
    qty:{
        type:Number
    },
    description:{
        type:String
    },
    discount:{
        type:Object
    },
    categoryId:{
        type:Object
    }
});
module.exports = mongoose.model('products',ProductSchema);