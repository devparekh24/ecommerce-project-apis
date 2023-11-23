const User = require('./../model/userModel')
const mainController = require('./mainController')
const catchAsyncErr = require('./../utils/catchAsyncErr')
const AppError = require('../utils/appError')
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

exports.deleteMe = catchAsyncErr(async (req, res, next) => {

    await User.findByIdAndUpdate(req.user.id, { active: false })

    res.status(204).json({
        status: 'success',
        data: null
    })
})

exports.changeUserRole = catchAsyncErr(async (req, res, next) => {
    const { id } = req.params;
    const { role } = req.body

    if (!['user', 'admin'].includes(role)) {
        return next(new AppError("Invalid User Role! choose ['user','admin]", 422))
    }
    const newUserRole = await User.findByIdAndUpdate(id, { role }, { new: true })

    if (!newUserRole) {
        return next(new AppError('No User Found!', 404))
    }

    res.status(200).json({
        status: 'success',
        message: 'User role updated successfully!',
        newUserRole
    })
})