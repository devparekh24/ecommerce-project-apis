const mainController = require('./mainController')
const Comment = require('../model/commentModel')
const catchAsyncErr = require('./../utils/catchAsyncErr')
const Product = require('../model/productModel')
const AppError = require('../utils/appError')

exports.setProductUserId = (req, res, next) => {

    // allowed nested routes
    if (!req.body.product) req.body.product = req.params.id
    if (!req.body.user) req.body.user = req.user.id
    next()
}

exports.getAllComments = mainController.getAll(Comment)
exports.getComment = mainController.getOne(Comment)

exports.createComment = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    const { comment, user } = req.body;

    const product = await Product.findById(id)

    if (!product) {
        return next(new AppError('No Product Found with this ID', 404))
    }
    if (!comment || comment === '') {
        return next(new AppError('Comment cannot be empty!', 404))
    }
    const newComment = new Comment({
        comment,
        product: product._id,
        user
    })
    await newComment.save()
    product.comments.push(newComment._id)
    await product.save()

    res.status(201).json({
        status: "success",
        message: "Comment Added Successfully!",
        comment

    })
})

exports.updateComment = mainController.updateOne(Comment)
exports.deleteComment = mainController.deleteOne(Comment)
