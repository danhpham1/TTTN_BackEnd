const fs = require('fs');
const path = require('path')

module.exports.getIndexUpload = (req, res) => {
    const images = fs.readdirSync(path.join(__dirname, '../public/img/post'));
    res.render('ckeditor-layout/upload', { image: images });
}

module.exports.processUpload = (req, res) => {
    // console.log(req.file);
    res.redirect('/admin/browser');
}

module.exports.deleteImg = (req, res) => {
    // console.log(req.query.filename);
    // console.log(fs.existsSync(`./public/img/${req.query.filename}`));

    if (fs.existsSync(path.join(__dirname, `../public/img/post/${req.query.filename}`))) {
        fs.unlinkSync(path.join(__dirname, `../public/img/post/${req.query.filename}`));
    };
    res.redirect('/admin/browser');

}