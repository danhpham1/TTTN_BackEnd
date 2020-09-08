const route = require("../routes/admin/admin");

const mongoose = require("mongoose");
const BrandModel = require("../models/brand");
const MenuModel = require("../models/menu");

module.exports.getIndexMenu = async (req, res) => {
    let main = 'menu/index';
    let menu = await MenuModel.find();
    res.render('index', {
        main: main,
        menu: menu
    })
}

//create menu
module.exports.getIndexCreateMenu = async (req, res) => {
    try {
        let main = 'menu/create';
        let brandList = await BrandModel.find();
        res.render('index', {
            main: main,
            brandList: brandList
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports.processCreateMenu = async (req, res) => {
    try {
        let menu = new MenuModel({
            title: req.body.title,
            subMenu: req.body.subMenu,
            isHide: (req.body["isHide"]) ? true : false
        })
        await menu.save();
        res.redirect("/admin/menu");
    } catch (err) {
        console.log(err);
    }
}

//edit menu
module.exports.getIndexEditMenu = async (req, res) => {
    try {
        let main = "menu/edit";
        let menu = await MenuModel.find({ _id: req.params.id });
        let brandList = await BrandModel.find();
        res.render("index", {
            main: main,
            menu: menu[0],
            brandList: brandList
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports.processEditMenu = async (req, res) => {
    try {
        let subMenu = req.body.subMenu;
        let isHide = (req.body["isHide"]) ? true : false;
        await MenuModel.findByIdAndUpdate(req.params.id, { $set: { title: req.body.title, subMenu: subMenu, isHide: isHide } }, { new: true });
        res.redirect("/admin/menu");
    } catch (err) {
        console.log(err)
    }
}

//delete menu
module.exports.deleteMenu = async (req, res) => {
    try {
        await MenuModel.deleteOne({ _id: req.params.id });
        res.redirect("/admin/menu");
    } catch (err) {
        console.log(err);
    }
}