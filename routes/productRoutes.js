const express = require('express')
const router = express.Router()
const productController = require('../controller/productController')
const authController = require('../controller/authController')

router.use(authController.protectedRoute)

router
    .route('/')
    .get(productController.getAllProducts)
    .post(productController.createProduct)

router
    .route('/:id')
    .get(productController.getProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = router