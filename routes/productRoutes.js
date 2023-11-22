const express = require('express')
const router = express.Router({ mergeParams: true })
const productController = require('../controller/productController')
const authController = require('../controller/authController')
const commentController = require('../controller/commentController')
const likeController = require('../controller/likeController')

router.use(authController.protectedRoute)

router.get('/most-recent-products', productController.getMostRecentProduct)
router.get('/getbytype/:id', productController.getProductByProductTypes)
router.post('/:id/comments', commentController.setProductUserId, commentController.createComment)
router.get('/most-liked', productController.getMostLikedProducts)
router.post('/:id/likes', likeController.setProductUserId, likeController.addLikeOnProduct)

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