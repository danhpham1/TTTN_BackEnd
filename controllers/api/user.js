const fs = require('fs');
const path = require("path");
const jwt = require('jsonwebtoken');
const brcyptjs = require('bcryptjs');
const UserModel = require('../../models/user');
const jwtHelp = require('../../helpers/jwt');

module.exports.login = async (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;

        let user = await UserModel.find({ username: username });
        if (user.length >= 1) {
            if (brcyptjs.compareSync(password.toString(), user[0].password)) {
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