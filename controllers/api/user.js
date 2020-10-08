const fs = require('fs');
const path = require("path");
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const UserModel = require('../../models/user');
const jwtHelp = require('../../helpers/jwt');
const saltRound = 10;


function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports.login = async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;

        let user = await UserModel.find({ username: username });
        if (user.length >= 1) {
            if (bcryptjs.compareSync(password.toString(), user[0].password)) {
                let data = {
                    name: user[0].name,
                    username: user[0].username,
                    address: user[0].address,
                    phone: user[0].phone
                }
                res.status(200).json(
                    {
                        success: true,
                        user: { ...data },
                        token: jwtHelp.jwtHelp.signJWT(data)
                    }
                )
            } else {
                res.status(401).json(
                    {
                        success: false,
                        message: "Login failed",
                    }
                )
            }
        } else {
            res.status(401).json(
                {
                    success: false,
                    message: "Login failed",
                }
            )
        }
    } catch (error) {
        res.status(401).json(
            {
                success: false,
                message: "Login failed",
                error: error
            }
        )
    }
}

module.exports.processCreateUser = async (req, res) => {
    try {
        if (!isEmpty(req.body)) {
            let salt = bcryptjs.genSaltSync(saltRound);
            let passHash = bcryptjs.hashSync(req.body.password, salt);
            let user = new UserModel({
                username: req.body.username,
                password: passHash,
                email: req.body.email,
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone,
                role: 'Khách Hàng',
                creator: req.body.name
            })
            console.log(user);
            await user.save();
            res.status(200).json({
                success: true,
                message: 'create success'
            })
        } else {
            res.status(503).json(
                {
                    success: false,
                    message: "Create failed",
                    error: error
                }
            )
        }
    } catch (error) {
        res.status(503).json(
            {
                success: false,
                message: "Create failed",
                error: error
            }
        )
    }
}