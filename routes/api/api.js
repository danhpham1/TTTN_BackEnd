const express = require('express');
const route = express.Router();


//middleware
const checkTokenMiddleware = require('../../middlewares/checktoken');

//controller api
const brandApiController = require('../../controllers/api/brand');
const menuApiController = require("../../controllers/api/menu");
const sliderApiController = require('../../controllers/api/slider');
const userApiController = require('../../controllers/api/user');
const productApiController = require('../../controllers/api/product');
const orderApiController = require('../../controllers/api/order');
const searchApiController = require("../../controllers/api/search");
const checkTokenController = require('../../controllers/api/checktoken');
const postApiController = require("../../controllers/api/post");
const commentApiController = require("../../controllers/api/comment");

//brand
route.get('/brand', brandApiController.getAllBrand);

//list menu
route.get('/menu', menuApiController.getMenu);

//slider
route.get('/slider', sliderApiController.getSlider);

//user
route.post('/auth', userApiController.login);

//product
route.get('/product', productApiController.processGetProduct);
route.get('/product/getrandom', productApiController.processGetProductRandom);
route.get('/product/:id', productApiController.processGetProductDetail);

//order
route.get('/order/:username', checkTokenMiddleware.checkToken, orderApiController.getOrderWithIdUser);
route.get('/order/detail/:id', checkTokenMiddleware.checkToken, orderApiController.getOrderDetail);
route.post('/order', checkTokenMiddleware.checkToken, orderApiController.processPostOrder);
route.patch('/order',checkTokenMiddleware.checkToken,orderApiController.cancelOrder);

//user
route.post('/user/register', userApiController.processCreateUser);
route.post('/user/login', userApiController.login);

//search
route.get('/search', searchApiController.processSearchProduct);

//check token expired
route.get('/checktoken/:token', checkTokenController.checkTokenExpired);

//post
route.get('/posts', postApiController.getAllPost);
route.get('/post/:id', postApiController.getPostById);

//comment
route.get('/comments/:id',commentApiController.getComments);
route.post('/comments',checkTokenMiddleware.checkToken,commentApiController.postComment);


module.exports = route;