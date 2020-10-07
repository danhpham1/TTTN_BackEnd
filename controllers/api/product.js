const mongoose = require('mongoose');
const ProductModel = require('../../models/product');

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

//get product detail
module.exports.processGetProductDetail = async (req, res) => {
    try {
        let idProduct = req.params.id;
        let product = await ProductModel.findById(idProduct);
        res.status(200).json(
            {
                success: true,
                data: product
            }
        )
    } catch (error) {
        res.status(503).json(
            {
                success: false,
                message: 'Get product failed',
                error: error
            }
        )
    }
}

module.exports.processGetProduct = async (req, res) => {
    try {
        if (isEmpty(req.query)) {
            let productList = await ProductModel.find();
            res.status(200).json({
                success: true,
                data: productList
            })
        } else {
            let query = {};
            if (req.query.brand) {
                let brandQuery = { title: { $regex: req.query.brand, $options: 'i' } };
                query = { ...brandQuery };
            }
            if (req.query.type) {
                let typeQuery = { type: { $regex: req.query.type, $options: 'i' } };
                query = { ...query, ...typeQuery };
            }
            if (req.query.size) {
                if (!isEmpty(query)) {
                    let productList = await ProductModel.aggregate([
                        { $match: query },
                        { $limit: +req.query.size }
                    ]);
                    res.status(200).json({
                        success: true,
                        data: productList
                    })
                } else {
                    let productList = await ProductModel.aggregate([
                        { $limit: +req.query.size }
                    ])
                    res.status(200).json({
                        success: true,
                        data: productList
                    })
                }
            } else {
                if (!isEmpty(query)) {
                    let productList = await ProductModel.aggregate([
                        { $match: query },
                    ]);
                    res.status(200).json({
                        success: true,
                        data: productList
                    })
                }
            }
        }
    } catch (error) {
        res.status(503).json(
            {
                success: false,
                message: 'Get product failed',
                error: error
            }
        )
    }
}


//get product random
module.exports.processGetProductRandom = async (req, res) => {
    // console.log(req.query.size);
    try {
        if (!isEmpty(req.query)) {
            let size = req.query.size;
            let productList = await ProductModel.aggregate([
                { $sample: { size: +size } }
            ])
            res.status(200).json(
                {
                    success: true,
                    data: productList
                }
            )
        } else {
            res.status(503).json(
                {
                    success: false,
                    message: 'Get product failed',
                    error: error
                }
            )
        }
    } catch (error) {
        res.status(503).json(
            {
                success: false,
                message: 'Get product failed',
                error: error
            }
        )
    }
}