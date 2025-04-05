const mongoose = require('mongoose');
const BookmarkSchema
    = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    productId:{
        type:Object
    },
    createdDate:{
        type:Date
    }
});
module.exports = mongoose.model('bookmark',BookmarkSchema);