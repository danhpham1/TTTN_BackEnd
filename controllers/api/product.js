const mongoose = require('mongoose');
const ProductModel = require('../../models/product');

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
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
            // console.log((req.query.type === undefined));
            if (req.query.search && (req.query.type == undefined)) {
                // console.log(req.query.search);
                let searchQuery = req.query.search;
                let productListSearch = await ProductModel.find(
                    { title: { $regex: searchQuery, $options: 'i' } }
                )
                res.status(200).json({
                    success: true,
                    data: productListSearch
                })
            } else if (req.query.search || req.query.type) {
                if (req.query.search && req.query.type) {
                    let searchQuery = req.query.search;
                    let typeQuery = req.query.type;
                    let productListSearchAndType = await ProductModel.find(
                        {
                            title: { $regex: searchQuery, $options: 'i' },
                            type: { $regex: typeQuery, $options: 'i' }
                        }
                    )
                    res.status(200).json({
                        success: true,
                        data: productListSearchAndType
                    })
                } else {
                    let typeQuery = req.query.type;
                    let productListType = await ProductModel.find(
                        {
                            type: { $regex: typeQuery, $options: 'i' }
                        }
                    )
                    res.status(200).json({
                        success: true,
                        data: productListType
                    })
                }
            } else {
                let productList = await ProductModel.find();
                res.status(200).json({
                    success: true,
                    data: productList
                })
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