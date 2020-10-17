const ProductModel = require('../../models/product');

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports.processSearchProduct = async (req, res) => {
    if (!isEmpty(req.query)) {
        try {
            let productList = await ProductModel.aggregate([
                { $match: { title: { $regex: req.query.title, $options: 'i' } } },
            ]);
            res.status(200).json({
                success: true,
                data: productList
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error
            })
        }
    } else {
        res.status(500).json({
            success: false,
            message: "Failed please input query"
        })
    }
}
