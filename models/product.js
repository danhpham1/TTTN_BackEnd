const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    guarantee: {
        type: Number,
        required: true
    },
    describe: {
        type: Object,
        require: true
    },
    warrantyPolicy: {
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
    amount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("products", ProductSchema);