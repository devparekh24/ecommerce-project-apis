const User = require('./../model/userModel')
const mainController = require('./mainController')
const catchAsyncErr = require('/utils/catchAsyncErr')
exports.getAllUser = mainController.getAll(User)
exports.getUser = mainController.getOne(User)
exports.updateUser = mainController.updateOne(User)
exports.deleteUser = mainController.deleteOne(User)
exports.createUser = catchAsyncErr(async (req, res, next) => {
    res.status(500).json({
        status: 'error',
        meassage: 'Please use /registeruser !'
    })
})