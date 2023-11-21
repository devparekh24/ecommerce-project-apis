const ProductType = require('../model/productTypeModel')
const mainController = require('./mainController')

exports.getAllProductTypes = mainController.getAll(ProductType)
exports.getProductType = mainController.getOne(ProductType)
exports.createProductType = mainController.createOne(ProductType)
exports.updateProductType = mainController.updateOne(ProductType)
exports.deleteProductType = mainController.deleteOne(ProductType)