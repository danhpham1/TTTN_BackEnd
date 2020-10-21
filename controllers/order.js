const mongoose = require("mongoose");
const OrderModel = require("../models/order");

module.exports.getIndex = async (req, res) => {
    let main = 'order/index';
    let orderList = await (await OrderModel.find()).reverse();
    let perpage = 5;
    let totalPage = Math.ceil(orderList.length / perpage);
    let currentPage = req.query.page || 1;
    let start = (currentPage - 1) * perpage;
    let end = (currentPage) * perpage;
    res.render('index', {
        main: main,
        user: req.session.userInfo,
        orderList: orderList.slice(start, end),
        totalPage: totalPage,
        currentPage: currentPage,
    })
}

module.exports.getIndexEdit = async (req, res) => {
    try {
        let main = "order/edit";
        let order = await OrderModel.find({ _id: req.params.id });
        res.render("index", {
            main: main,
            order: order[0],
            user: req.session.userInfo
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports.proccesEditOrder = async (req, res) => {
    try {
        await OrderModel.findByIdAndUpdate(
            req.params.id,
            {
                $set:
                {
                    name: req.body.name,
                    address: req.body.address,
                    phone: req.body.phone,
                    state: +req.body.state
                }
            },
            { new: true });
        res.redirect("/admin/order");
    } catch (err) {
        console.log(err)
    }
}