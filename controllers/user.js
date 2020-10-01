const crypto = require("crypto");
const RoleModel = require("../models/role");
const UserModel = require("../models/user");
const bcryptjs = require("bcryptjs");

const saltRound = 10;

module.exports.getIndex = async (req, res) => {
    try {
        let main = 'user/index';
        let users = await UserModel.find();
        let perpage = 5;
        let totalPage = Math.ceil(users.length / perpage);
        let currentPage = req.query.page || 1;
        let start = (currentPage - 1) * perpage;
        let end = (currentPage) * perpage;
        res.render("index", {
            main: main,
            users: users.slice(start, end),
            totalPage: totalPage,
            currentPage: currentPage,
            user: req.session.userInfo
        })
    } catch (err) {
        console.log(err)
    }
}

//create
module.exports.getIndexCreate = async (req, res) => {
    try {
        let main = 'user/create';
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

module.exports.processCreate = async (req, res) => {
    try {
        let salt = bcryptjs.genSaltSync(saltRound);
        let passHash = bcryptjs.hashSync(req.body.password, salt);
        let user = new UserModel({
            name: req.body.name,
            username: req.body.username,
            password: passHash,
            email: (req.body.email) ? req.body.email : '',
            phone: (req.body.phone) ? req.body.phone : '',
            address: (req.body.address) ? req.body.address : '',
            role: req.body.role,
            creator: req.session.userInfo.name
        });
        await user.save();
        res.redirect("/admin/user");
    } catch (err) {
        console.log(err);
    }
}

//Edit
module.exports.getIndexEdit = async (req, res) => {
    try {
        let main = 'user/edit';
        let user = await UserModel.findById(req.params.id);
        let roles = await RoleModel.find();
        res.render("index", {
            main: main,
            user: user,
            roles: roles,
            user: req.session.userInfo
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports.processEdit = async (req, res) => {
    try {
        await UserModel.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    phone: req.body.phone,
                    address: req.body.address,
                    role: req.body.role,
                    creator: req.session.userInfo.name
                }
            },
            { new: true }
        )
        res.redirect("/admin/user");
    } catch (err) {
        console.log(err);
    }
}

//delete
module.exports.processDelete = async (req, res) => {
    try {
        await UserModel.deleteOne({ _id: req.params.id });
        res.redirect("/admin/user");
    } catch (err) {
        console.log(err);
    }
}