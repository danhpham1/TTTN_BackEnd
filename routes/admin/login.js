const express = require("express");
const route = express.Router();

const loginController = require("../../controllers/login");

route.get("/", loginController.getIndex);
route.post("/", loginController.processLogin);

module.exports = route;