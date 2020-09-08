const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
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
    subMenu: {
        type: Array
    }
})

module.exports = mongoose.model("menus", MenuSchema);