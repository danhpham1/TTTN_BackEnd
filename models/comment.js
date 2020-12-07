const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    productId:{
        type:mongoose.Types.ObjectId,
        required:true
    }
})

module.exports = mongoose.model("comments", CommentSchema);