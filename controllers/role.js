const mongoose = require("mongoose");
const RoleModel = require("../models/role");

module.exports.getIndex = async (req, res) => {
    try {
        let main = 'role/index';
        let roles = await RoleModel.find();
        res.render("index", {
            main: main,
            roles: roles,
            user: req.session.userInfo
        })
    } catch (err) {
        console.log(err);
    }
}

//create 
module.exports.getIndexCreate = async (req, res) => {
    let main = 'role/create';
    res.render("index", {
        main: main,
        user: req.session.userInfo,
    })
}

module.exports.processCreate = async (req, res) => {
    try {
        // console.log(req.session.userInfo.name);
        let role = new RoleModel({
            name: req.body.name,
            creator: req.session.userInfo.name
        });
        await role.save();
        res.redirect("/admin/role");
    } catch (err) {
        console.log(err);
    }
}

//edit
module.exports.getIndexEdit = async (req, res) => {
    try {
        let main = "role/edit";
        let role = await RoleModel.findById(req.params.id);
        res.render("index", {
            main: main,
            role: role,
            user: req.session.userInfo,
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports.processEdit = async (req, res) => {
    try {
        await RoleModel.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, creator: req.session.userInfo.name } }, { new: true });
        res.redirect("/admin/role");
    } catch (err) {
        console.log(err);
    }
}

//delete 
module.exports.processDelete = async (req, res) => {
    try {
        await RoleModel.deleteOne({ _id: req.params.id });
        res.redirect("/admin/role");
    } catch (err) {
        console.log(err);
    }
}