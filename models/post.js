const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    contentSub: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },
    creator: {
        type: String,
    },
    isHide: {
        type: Boolean,
        default: false
    },
    logo: {
        type: String,
    },
})

module.exports = mongoose.model("posts", PostSchema);