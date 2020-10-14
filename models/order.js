const mongoose = require("mongoose");

const OrderChema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    state: {
        type: Number,
        required: true
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },
    orderDetail: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model("orders", OrderChema);