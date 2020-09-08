const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },
    dateUpdate: {
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

module.exports = mongoose.model("brands", BrandSchema);