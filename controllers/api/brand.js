const mongoose = require("mongoose");
const BrandModel = require("../../models/brand");

module.exports.getAllBrand = async (req, res) => {
    try {
        let brandList = await BrandModel.find();
        res.status(200).json({
            success: true,
            data: brandList
        })
    } catch (error) {
        res.status(503).json(
            {
                success: false,
                message: "Get brand failed",
                error: error
            }
        )
    }
}