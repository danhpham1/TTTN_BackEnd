const OrderModel = require('../../models/order');
const ProductModel = require('../../models/product');
const mongoose = require('mongoose');

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}


module.exports.getOrderWithIdUser = async (req, res) => {
    if (!isEmpty(req.params.username)) {
        try {
            let orderList = await OrderModel.find({ username: req.params.username });
            res.status(200).json({
                success: true,
                data: orderList
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error
            })
        }
    } else {
        res.status(500).json({
            success: false,
            message: "Please input IdUsers Params"
        })
    }
}

module.exports.getOrderDetail = async (req, res) => {
    if (!isEmpty(req.params.id)) {
        try {
            let orderDetail = await OrderModel.findById(req.params.id);
            res.status(200).json({
                success: true,
                data: orderDetail
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error
            })
        }
    } else {
        res.status(500).json({
            success: false,
            message: "Please input id Params"
        })
    }
}

module.exports.processPostOrder = async (req, res) => {
    try {
        req.body.items.forEach(async (element) => {
            let product = await ProductModel.findById(element.idProduct);
            if (product) {
                await ProductModel.findByIdAndUpdate(
                    product._id,
                    { $set: { amount: ((+product.amount) - (+element.amout)) } },
                    { new: true }
                )
            }
        });
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

module.exports.cancelOrder = async (req, res) => {
    try {
        OrderModel.findByIdAndUpdate(req.body.id,
            {
                $set: {
                    state: -1
                },
            }
            ,
            {
                new: true
            }
        )
        res.status(200).json({
            success: true,
            message: "cancel order success"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}