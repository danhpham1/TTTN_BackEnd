const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const privateKey = fs.readFileSync(path.join(__dirname, '../private.key')).toString();

module.exports.jwtHelp = {
    signJWT: function (data) {
        return jwt.sign({ ...data, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, privateKey)
    },
    verifyJWT: function (token) {
        return jwt.verify(token, privateKey);
    }
}