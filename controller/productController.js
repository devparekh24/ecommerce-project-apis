const Product = require('../model/productModel')
const mainController = require('./mainController')

exports.getAllProducts = mainController.getAll(Product)
exports.getProduct = mainController.getOne(Product)
exports.createProduct = mainController.createOne(Product)
exports.updateProduct = mainController.updateOne(Product)
exports.deleteProduct = mainController.deleteOne(Product)