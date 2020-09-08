const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

//require routes
const adminRoutes = require("./routes/admin/admin");

//connect mongodb
require('./configs/connectdb');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan("dev"));

app.use("/admin", adminRoutes);

app.listen(3000, () => { console.log('server start') });