const express = require("express");
const route = express.Router();

const uploadBrand = require('../../configs/multer');

//require controller
const adminController = require("../../controllers/admin");
const brandController = require("../../controllers/brand");
const menuController = require("../../controllers/menu");
const sliderController = require("../../controllers/slider");
const roleController = require("../../controllers/role");
const userController = require("../../controllers/user");
const productController = require("../../controllers/product");
const orderController = require("../../controllers/order");

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

//role route
route.get("/role", roleController.getIndex);
route.get("/role/create", roleController.getIndexCreate);
route.post("/role/create", roleController.processCreate);
route.get("/role/edit/:id", roleController.getIndexEdit);
route.post("/role/edit/:id", roleController.processEdit);
route.get("/role/delete/:id", roleController.processDelete);

//user route
route.get("/user", userController.getIndex);
route.get("/user/create", userController.getIndexCreate);
route.post("/user/create", userController.processCreate);
route.get("/user/edit/:id", userController.getIndexEdit);
route.post("/user/edit/:id", userController.processEdit);
route.get("/user/delete/:id", userController.processDelete);

//product route
route.get("/product", productController.getIndex);
route.get("/product/create", productController.getIndexCreate);
route.post("/product/create", uploadBrand.uploadProduct.single("logo-product"), productController.processCreate);
route.get("/product/edit/:id", productController.getIndexEdit);
route.post("/product/edit/:id", productController.processEdit);
route.get("/product/delete/:id", productController.processDelete);

//order route
route.get("/order", orderController.getIndex);
route.get("/order/edit/:id", orderController.getIndexEdit);
route.post("/order/edit/:id", orderController.proccesEditOrder);


module.exports = route;