const mongoose = require("mongoose");
const ProductModel = require("../models/product");
const BrandModel = require("../models/brand");
const path = require("path");
const fs = require("fs");

module.exports.getIndex = async (req, res) => {
    let main = "product/index";
    let productList = await ProductModel.find();
    res.render("index", {
        main: main,
        user: req.session.userInfo,
        productList: productList
    })
};

module.exports.getIndexCreate = async (req, res) => {
    let main = "product/create";
    let brandList = await BrandModel.find();
    res.render("index", {
        main: main,
        brandList: brandList,
        user: req.session.userInfo
    })
}

module.exports.processCreate = async (req, res) => {
    // console.log(req.body);
    try {
        let nameFile = req.file.filename;
        let describe = {
            thuonghieu: req.body.brand,
            gioitinh: req.body.type,
            loaikinh: req.body.loaikinh,
            may: req.body.may,
            chatlieuday: req.body.chatlieuday,
            maumatso: req.body.maumatso,
            duongkinh: req.body.duongkinh,
            doday: req.body.doday,
            mauday: req.body.mauday,
            nieng: req.body.nieng,
            chiunuoc: req.body.chiunuoc,
            chucnang: req.body.chucnang
        }

        let product = new ProductModel({
            title: req.body.title,
            name: req.body.name,
            brand: req.body.brand,
            type: req.body.type,
            price: req.body.price,
            guarantee: req.body.guarantee,
            describe: describe,
            warrantyPolicy: req.body.warrantypolicy,
            creator: req.session.userInfo.name,
            isHide: (req.body.isHide) ? true : false,
            logo: nameFile
        });
        await product.save();
        res.redirect("/admin/product");
    } catch (err) {
        console.log(err);
    }
}

//edit
module.exports.getIndexEdit = async (req, res) => {
    try {
        let main = "product/edit";
        let product = await ProductModel.findById(req.params.id);
        console.log(product);
        let brandList = await BrandModel.find();
        res.render("index", {
            main: main,
            product: product,
            user: req.session.userInfo,
            brandList: brandList
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports.processEdit = async (req, res) => {
    try {
        let describe = {
            thuonghieu: req.body.brand,
            gioitinh: req.body.type,
            loaikinh: req.body.loaikinh,
            may: req.body.may,
            chatlieuday: req.body.chatlieuday,
            maumatso: req.body.maumatso,
            duongkinh: req.body.duongkinh,
            doday: req.body.doday,
            mauday: req.body.mauday,
            nieng: req.body.nieng,
            chiunuoc: req.body.chiunuoc,
            chucnang: req.body.chucnang
        }
        await ProductModel.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    title: req.body.title,
                    name: req.body.name,
                    brand: req.body.brand,
                    type: req.body.type,
                    price: req.body.price,
                    guarantee: req.body.guarantee,
                    describe: describe,
                    warrantyPolicy: req.body.warrantypolicy,
                    creator: req.session.userInfo.name,
                    isHide: (req.body.isHide) ? true : false
                }
            }
        )
        res.redirect("/admin/product");
    } catch (err) {
        console.log(err);
    }
}

module.exports.processDelete = async (req, res) => {
    try {
        let dir = path.join(__dirname, '../public/img/product');
        // console.log(dir);
        if (fs.existsSync(`${dir}/${req.query.fileName}`)) {
            fs.unlinkSync(`${dir}/${req.query.fileName}`);
        };
        await ProductModel.deleteOne({ _id: req.params.id });
        res.redirect("/admin/product");
    } catch (err) {
        console.log(err);
    }
}