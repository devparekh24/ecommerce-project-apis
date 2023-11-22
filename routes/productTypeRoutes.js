const express = require('express')
const router = express.Router()
const productTypeController = require('../controller/productTypeController')
const authController = require('../controller/authController')

router.use(authController.protectedRoute)

router
    .route('/')
    .get(productTypeController.getAllProductTypes)
    .post(productTypeController.createProductType)

router
    .route('/:id')
    .get(productTypeController.getProductType)
    .patch(productTypeController.updateProductType)
    .delete(productTypeController.deleteProductType)

module.exports = router