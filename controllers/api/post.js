const PostModel = require('../../models/post');

module.exports.getAllPost = async (req, res) => {
    try {
        let postList = await (await PostModel.find()).reverse();
        res.status(200).json({
            success: true,
            data: postList
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

module.exports.getPostById = async (req, res) => {
    try {
        let post = await PostModel.findById(req.params.id);
        res.status(200).json({
            success: true,
            data: post
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}