
module.exports.getIndex = (req, res) => {
    let main = 'partials/main';
    res.render('index', {
        main: main,
        user: req.session.userInfo
    });
}