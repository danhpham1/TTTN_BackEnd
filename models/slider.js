const mongoose = require("mongoose");

const SliderSchema = new mongoose.Schema({
    logo: {
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
})

module.exports = mongoose.model("sliders", SliderSchema);