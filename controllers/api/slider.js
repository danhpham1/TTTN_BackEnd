const mongoose = require("mongoose");
const SliderModel = require("../../models/slider");

module.exports.getSlider = async (req, res) => {
    try {
        let slider = await SliderModel.find();
        res.status(200).json({
            success: true,
            data: slider
        })
    } catch (error) {
        res.status(503).json(
            {
                success: false,
                message: "Get slider failed",
                error: error
            }
        )
    }
}