module.exports.processLogout = (req, res) => {
    req.session.user = undefined;
    res.redirect("/login");
}