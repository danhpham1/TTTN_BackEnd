const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
    name: {
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
    }
})

module.exports = mongoose.model("roles", RoleSchema);