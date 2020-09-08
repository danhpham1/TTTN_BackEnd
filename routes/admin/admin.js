const express = require("express");
const route = express.Router();

const uploadBrand = require('../../configs/multer');

//require controller
const adminController = require("../../controllers/admin");
const brandController = require("../../controllers/brand");
const menuController = require("../../controllers/menu");
const sliderController = require("../../controllers/slider");

route.get("/index", adminController.getIndex);

//brand route
route.get("/brand", brandController.getIndex);
route.get("/brand/create", brandController.getIndexcreate);
route.post("/brand/create", uploadBrand.uploadBrand.single('logo-brand'), brandController.processCreateBrand);
route.get("/brand/edit/:id", brandController.getIndexEdit);
route.post("/brand/edit/:id", brandController.proessEditBrand);
route.get("/brand/delete/:id", brandController.deleteBrand);

//menu route
route.get("/menu", menuController.getIndexMenu);
route.get("/menu/create", menuController.getIndexCreateMenu);
route.post("/menu/create", menuController.processCreateMenu);
route.get("/menu/edit/:id", menuController.getIndexEditMenu);
route.post("/menu/edit/:id", menuController.processEditMenu);
route.get("/menu/delete/:id", menuController.deleteMenu);

//slider route
route.get("/slider", sliderController.getIndex);
route.get("/slider/create", sliderController.getIndexCreateSlider);
route.post("/slider/create", uploadBrand.uploadSlider.single('logo-slider'), sliderController.processCreateSlider);
route.get("/slider/delete/:id", sliderController.deleteSlider);


module.exports = route;