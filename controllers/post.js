const PostModel = require('../models/post');
const path = require('path');
const fs = require('fs');

module.exports.getIndex = async (req, res) => {
    let main = 'post/index';
    let postList = await PostModel.find();
    res.render('index',
        {
            main: main,
            user: req.session.userInfo,
            postList: postList
        }
    )
}


module.exports.getIndexCreate = async (req, res) => {
    let main = 'post/create';
    res.render('index',
        {
            main: main,
            user: req.session.userInfo,
        }
    )
}

module.exports.processcreatePost = async (req, res) => {
    try {
        let nameFile = req.file.filename;
        let post = new PostModel(
            {
                title: req.body.title,
                contentSub: req.body.contentSub,
                content: req.body.content,
                creator: req.session.userInfo.name,
                isHide: (req.body.isHide) ? true : false,
                logo: nameFile
            }
        )
        await post.save();
        res.redirect('/admin/post');
    } catch (error) {
        res.redirect('/admin/post');
    }
}

module.exports.getEditPost = async (req, res) => {
    let main = 'post/edit';
    let post = await PostModel.findById(req.params.id);
    console.log(post);
    res.render('index',
        {
            main: main,
            user: req.session.userInfo,
            post: post
        }
    )
}

module.exports.processEditPost = async (req, res) => {
    try {
        await PostModel.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    contentSub: req.body.contentSub,
                    isHide: (req.body.isHide) ? true : false
                }
            }
        )
        res.redirect('/admin/post');
    } catch (error) {
        res.redirect('/admin/post');
    }
}

module.exports.processDelete = async (req, res) => {
    try {
        let dir = path.join(__dirname, '../public/img/post');
        // console.log(dir);
        if (fs.existsSync(`${dir}/${req.query.fileName}`)) {
            fs.unlinkSync(`${dir}/${req.query.fileName}`);
        };
        await PostModel.deleteOne({ _id: req.params.id });
        res.redirect("/admin/post");
    } catch (err) {
        console.log(err);
        res.redirect("/admin/post");
    }
}