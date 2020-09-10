const mongoose = require("mongoose");
const UserModel = require("../models/user");
const bcryptjs = require("bcryptjs");

module.exports.getIndex = async (req, res) => {
    // console.log(req.session);
    res.render("login");
}

module.exports.processLogin = async (req, res) => {
    // console.log(req.body);
    try {
        let user = await UserModel.find({ username: req.body.username });
        console.log(user);
        if (user.length < 1) {
            res.redirect("/login");
        } else {
            if (bcryptjs.compareSync(req.body.password, user[0].password)) {
                let userInfo = {
                    name: user[0].name,
                    username: user[0].username,
                    role: user[0].role
                }
                req.session.userInfo = userInfo;
                res.redirect("/admin/index");
            } else {
                res.redirect("/login");
            }
        }
    } catch (err) {
        console.log(err);
    }
}