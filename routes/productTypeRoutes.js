const express = require('express')
const router = express.Router()
const productTypeController = require('../controller/productTypeController')
const authController = require('../controller/authController')

router.use(authController.protectedRoute)

router
    .route('/')
    .get(productTypeController.getAllProductTypes)
    .post(authController.restrictTo('admin'), productTypeController.createProductType)

router
    .route('/:id')
    .get(productTypeController.getProductType)
    .patch(authController.restrictTo('admin'), productTypeController.updateProductType)
    .delete(authController.restrictTo('admin'), productTypeController.deleteProductType)

module.exports = router