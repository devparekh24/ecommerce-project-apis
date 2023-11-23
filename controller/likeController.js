const Like = require('../model/likeModel')
const catchAsyncErr = require('./../utils/catchAsyncErr')
const Product = require('../model/productModel')
const AppError = require('../utils/appError')
const User = require('../model/userModel')

exports.setProductUserId = (req, res, next) => {

    // allowed nested routes
    if (!req.body.product) req.body.product = req.params.id
    if (!req.body.user) req.body.user = req.user.id
    next()
}

exports.addLikeOnProduct = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    const { user } = req.body;

    const product = await Product.findById(id)

    if (!product) {
        return next(new AppError('No Product Found with this ID', 404))
    }

    const isProductLiked = await Like.findOne({ user, product: id })

    if (!isProductLiked) {

        const newLike = new Like({
            likes: true,
            product: product._id,
            user
        })
        await newLike.save()

        product.likes.push(newLike._id)
        await product.save()

        res.status(201).json({
            status: "success",
            message: "Like Added Successfully!"
        })
    } else {

        const setDisLike = await Like.findOneAndDelete({ user, product: id })

        product.likes.pop(setDisLike._id)
        await product.save()

        res.status(200).json({
            status: "success",
            message: "Like Removed!"
        })
    }
})

exports.getMostLikedProducts = catchAsyncErr(async (req, res, next) => {

    const mostLikedProducts = await Like.aggregate([
        {
            $group: {
                _id: '$product',
                count: { $sum: 1 },
            },
        },
        {
            $sort: { count: -1 },
        },
    ]);

    // Extract product IDs from the aggregation result
    const mostLikedProductIds = mostLikedProducts.map(like => like._id);

    // Retrieve product details for the most liked products
    const mostLikedProductDetails = await Product.find({ _id: { $in: mostLikedProductIds } }).limit(3).select('_id title likes');

    if (!mostLikedProductDetails) {
        return next(new AppError('No Product Found!', 404))
    }
    res.status(200).json({
        status: 'success',
        result: mostLikedProductDetails.length,
        products: mostLikedProductDetails
    })
})