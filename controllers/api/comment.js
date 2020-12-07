const mongoose = require('mongoose');
const CommentModel = require('../../models/comment');

module.exports.postComment = async(req,res)=>{
    console.log(req.body)
    try {
        let comment = new CommentModel({
            username:req.body.username,
            name:req.body.name,
            comment:req.body.comment,
            productId:req.body.productId
        })
        // console.log(comment);
        await comment.save();
        res.status(201).json({
            success:true,
            data:comment
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error
        })
    }
}

module.exports.getComments = async (req,res)=>{
    console.log(req.params.id);
    try {
        let productId = mongoose.Types.ObjectId(req.params.id);
        if(productId){
            let productComments = await CommentModel.aggregate([
                {$match:{productId:productId}}
            ])
            res.status(200).json({
                success:true,
                data:productComments
            })
        }else{
            res.status(500).json({
                success:false,
                messge:'Please get with idProduct'
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error
        })
    }
}