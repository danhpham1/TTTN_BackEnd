const mongoose = require("mongoose");
const MenuModel = require("../../models/menu");

module.exports.getMenu = async (req, res) => {
    try {
        let menu = await MenuModel.find();
        res.status(200).json({
            success: true,
            data: menu
        })
    } catch (error) {
        res.status(503).json(
            {
                success: false,
                message: "Get menu failed",
                error: error
            }
        )
    }
}