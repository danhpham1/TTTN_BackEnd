const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    dateCreate: {
        type: Date,
        default: Date.now()
    },
    email: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    historyOrder: {
        type: Array
    },
    creator: {
        type: String,
    },
})

module.exports = mongoose.model("users", UserSchema);