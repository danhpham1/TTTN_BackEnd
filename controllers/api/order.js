const OrderModel = require('../../models/order');

module.exports.processPostOrder = async (req, res) => {
    try {
        let order = new OrderModel({
            username: req.body.username,
            phone: req.body.phone,
            name: req.body.name,
            address: req.body.address,
            total: +req.body.totalInCart,
            state: 0,
            orderDetail: req.body.items

        })
        order.save();
        res.status(200).json({
            success: true,
            message: "add order success"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}