const express = require('express');
const route = express.Router();

//controller api
const brandApiController = require('../../controllers/api/brand');
const menuApiController = require("../../controllers/api/menu");
const sliderApiController = require('../../controllers/api/slider');
const userApiController = require('../../controllers/api/user');

//brand
route.get('/brand', brandApiController.getAllBrand);

//list menu
route.get('/menu', menuApiController.getMenu);

//slider
route.get('/slider', sliderApiController.getSlider);

//user
route.post('/auth', userApiController.login);


module.exports = route;