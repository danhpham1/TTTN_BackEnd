const express = require("express");
const route = express.Router();

const uploadBrand = require('../../configs/multer');

//require controller
const adminController = require("../../controllers/admin");
const brandController = require("../../controllers/brand");

route.get("/index", adminController.getIndex);

//brand route
route.get("/brand", brandController.getIndex);
route.get("/brand/create", brandController.getIndexcreate);
route.post("/brand/create", uploadBrand.single('logo-brand'), brandController.processCreateBrand);
route.get("/brand/edit/:id", brandController.getIndexEdit);
route.post("/brand/edit/:id", brandController.proessEditBrand);
route.get("/brand/delete/:id", brandController.deleteBrand);


module.exports = route;