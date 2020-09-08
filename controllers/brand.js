const mongoose = require("mongoose");
const BrandModel = require("../models/brand");

module.exports.getIndex = async (req, res) => {
    let main = "brand/index";
    let brandList = await BrandModel.find();
    res.render("index", {
        main: main,
        brandList: brandList
    })
}

//create
module.exports.getIndexcreate = async (req, res) => {
    let main = "brand/create";
    res.render("index", {
        main: main,

    })
}

module.exports.processCreateBrand = async (req, res) => {
    // console.log(req.body, req.file);
    let brand = new BrandModel({
        title: req.body.title,
        logo: req.file.filename
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
    let main = 'brand/edit';
    let brand = await BrandModel.findById(req.params.id);
    res.render('index', {
        main: main,
        brand: brand
    })
}