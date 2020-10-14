const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const expressSession = require("express-session");

//require routes
const adminRoutes = require("./routes/admin/admin");
const loginRoute = require("./routes/admin/login");
const logoutRoute = require("./routes/admin/logout");
const apiRoute = require("./routes/api/api");

//CROS
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type,X-Access-Token",
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

//middleware
const loginMiddleware = require("./middlewares/login");
//connect mongodb
require('./configs/connectdb');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan("dev"));

//config session
app.use(
    expressSession({
        secret: "dongho",
        saveUninitialized: true,
        resave: true,
        cookie: { maxAge: 60 * 60 * 60 * 60 * 60 },
    })
);

app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/admin", loginMiddleware.checkSessionLogin, adminRoutes);
app.use("/api/v1", apiRoute);

app.listen(process.env.PORT || 3000, () => { console.log('server start') });