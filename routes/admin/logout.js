const express = require("express");
const route = express.Router();

const logoutController = require("../../controllers/logout");

route.get("", logoutController.processLogout);

module.exports = route