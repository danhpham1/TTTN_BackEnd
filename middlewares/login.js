module.exports.checkSessionLogin = (req, res, next) => {
    if (!req.session.userInfo) {
        res.redirect("/login");
    } else {
        next();
    }
}