const jwtHelper = require('../helpers/jwt');
const UserModel = require('../models/user');

module.exports.checkToken = async (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (token) {
        try {
            let decoded = await jwtHelper.jwtHelp.verifyJWT(token);
            let user = await UserModel.find({ username: decoded.username });
            if (user.length >= 1) {
                next();
            } else {
                res.status(401).json({
                    success: false,
                    error: error,
                    message: 'user name not exsit'
                })
            }
        } catch (error) {
            res.status(401).json({
                success: false,
                error: error,
                message: 'token has expired'
            })
        }
    } else {
        res.status(401).json({
            success: false,
            error: 'No token provided.'
        })
    }
}