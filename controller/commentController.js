const mainController = require('./mainController')
const Comment = require('../model/commentModel')

exports.getAllComments = mainController.getAll(Comment)
exports.getComment = mainController.getOne(Comment)
exports.createComment = mainController.createOne(Comment)
exports.updateComment = mainController.updateOne(Comment)
exports.deleteComment = mainController.deleteOne(Comment)
