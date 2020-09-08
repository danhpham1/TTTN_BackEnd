const mongoose = require("mongoose");
const SliderModel = require("../models/slider");
const fs = require("fs");
const path = require("path");


module.exports.getIndex = async (req, res) => {
    let main = 'slider/index';
    let sliderList = await SliderModel.find();
    res.render("index", {
        main: main,
        sliderList: sliderList
    })
}

//create
module.exports.getIndexCreateSlider = (req, res) => {
    let main = 'slider/create';
    res.render("index", {
        main: main,
    })
}

module.exports.processCreateSlider = async (req, res) => {
    try {
        let nameFile = req.file.filename;
        console.log(req.file.filename);
        let slider = new SliderModel({
            logo: nameFile
        });
        await slider.save();
        res.redirect("/admin/slider");
    } catch (err) {
        console.log(err);
    }
}

//delete
module.exports.deleteSlider = async (req, res) => {
    try {
        let dir = path.join(__dirname, '../public/img/slider');
        // console.log(dir);
        if (fs.existsSync(`${dir}/${req.query.fileName}`)) {
            fs.unlinkSync(`${dir}/${req.query.fileName}`);
        };
        await SliderModel.deleteOne({ _id: req.params.id });
        res.redirect("/admin/slider");
    } catch (err) {
        console.log(err);
    }
}