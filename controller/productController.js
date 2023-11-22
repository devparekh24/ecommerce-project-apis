const Product = require('../model/productModel')
const AppError = require('../utils/appError')
const catchAsyncErr = require('../utils/catchAsyncErr')
const mainController = require('./mainController')

exports.getAllProducts = mainController.getAll(Product)
exports.getProduct = mainController.getOne(Product)
exports.createProduct = mainController.createOne(Product)
exports.updateProduct = mainController.updateOne(Product)
exports.deleteProduct = mainController.deleteOne(Product)

exports.getMostRecentProduct = catchAsyncErr(async (req, res, next) => {
    const recentProducts = await Product.find().sort({ createdAt: -1 }).limit(5).select('-__v -createdAt -updatedAt');
    if (!recentProducts) {
        return next(new AppError('No Recent Product Found!', 404))
    }
    res.status(200).json({
        status: 'success',
        result: recentProducts.length,
        recentProducts
    })
})

exports.getProductByProductTypes = catchAsyncErr(async (req, res, next) => {

    const typeId = req.params.id

    const productByType = await Product.find({ category: typeId }).select('-__v -createdAt -updatedAt')

    if (!typeId || !productByType) {
        return next(new AppError('No Product Found by this Product Category!', 404))
    }

    res.status(200).json({
        status: 'success',
        result: productByType.length,
        data: productByType
    })
})

// exports.getMostLikedProducts = catchAsyncErr(async (req, res, next) => {

//     const products = await Product.findOne().sort({ likes: -1 }).limit(3).select('_id title likes')
//     // const likes = products.likes.length
//     if (!products) {
//         return next(new AppError('No Product Found!', 404))
//     }

//     res.status(200).json({
//         status: 'success',
//         result: products.length,
//         products
//     })
// })
// exports.commentOnProduct = catchAsyncErr(async (req, res, next) => {

//     const { id } = req.params;
//     const { comment } = req.body;

//     const product = await Product.findById(id)

//     if (!product) {
//         return next(new AppError('No Product Found with this ID', 404))
//     }
//     if (!comment || comment === '') {
//         return next(new AppError('Comment cannot be empty!', 404))
//     }

//     product.comments.push(comment)
//     await product.save()

//     res.status(200).json({
//         status: "success",
//         message: "Comment Added Successfully!",
//         comment

//     })
// })