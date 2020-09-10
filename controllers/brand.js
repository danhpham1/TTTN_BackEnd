const mongoose = require("mongoose");
const path = require('path');
const fs = require("fs");
const BrandModel = require("../models/brand");


module.exports.getIndex = async (req, res) => {
    let main = "brand/index";
    let brandList = await BrandModel.find();
    res.render("index", {
        main: main,
        brandList: brandList,
        user: req.session.userInfo
    })
}

//create
module.exports.getIndexcreate = async (req, res) => {
    let main = "brand/create";
    res.render("index", {
        main: main,
        user: req.session.userInfo
    })
}

module.exports.processCreateBrand = async (req, res) => {
    // console.log(req.body, req.file);
    let brand = new BrandModel({
        title: req.body.title,
        logo: req.file.filename,
        creator: req.session.userInfo.name
    })
    // console.log(brand);
    try {
        await brand.save();
        res.redirect('/admin/brand');
    } catch (error) {
        console.log('add brand faild')
    }
}

//edit
module.exports.getIndexEdit = async (req, res) => {
    // console.log(req.params);
    try {
        let main = 'brand/edit';
        let brand = await BrandModel.findById(req.params.id);
        res.render('index', {
            main: main,
            brand: brand,
            user: req.session.userInfo,

        })

    } catch (error) {
        console.log(err);
    }
}

module.exports.proessEditBrand = async (req, res) => {
    try {
        let isHide = (req.body.isHide == 'on') ? true : false;
        await BrandModel.findByIdAndUpdate(req.params.id, { $set: { title: req.body.title, isHide: isHide, creator: req.session.userInfo.name } }, { new: true });
        res.redirect('/admin/brand');
    } catch (error) {
        console.log(err);
    }
}

//delete
module.exports.deleteBrand = async (req, res) => {
    try {
        let dir = path.join(__dirname, '../public/img/brand');
        // console.log(dir);
        if (fs.existsSync(`${dir}/${req.query.fileName}`)) {
            fs.unlinkSync(`${dir}/${req.query.fileName}`);
        };
        await BrandModel.deleteOne({ _id: req.params.id });
        res.redirect("/admin/brand");
    } catch (err) {
        console.log(err);
    }
}