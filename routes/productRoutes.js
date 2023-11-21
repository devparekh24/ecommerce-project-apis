const express = require('express')
const router = express.Router({ mergeParams: true })
const productController = require('../controller/productController')
const authController = require('../controller/authController')

router.use(authController.protectedRoute)

router.get('/most-recent-products', productController.getMostRecentProduct)
router.get('/getbytype/:id', productController.getProductByProductTypes)
router.post('/:id/comments', productController.commentOnProduct)

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