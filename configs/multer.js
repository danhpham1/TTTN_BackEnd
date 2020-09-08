const multer = require('multer');
const path = require("path");

var storageUpLoadBrand = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/img/brand'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

var uploadBrand = multer({ storage: storageUpLoadBrand });

module.exports = uploadBrand;