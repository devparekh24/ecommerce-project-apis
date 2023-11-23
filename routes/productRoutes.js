const express = require('express')
const router = express.Router({ mergeParams: true })
const productController = require('../controller/productController')
const authController = require('../controller/authController')
const commentController = require('../controller/commentController')
const likeController = require('../controller/likeController')
const multer = require('multer')
const storage = multer.diskStorage({})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    }
    else {
        cb('invalid image file', false)
    }
};

const uploads = multer({ storage, fileFilter })

router.use(authController.protectedRoute)

router.get('/most-recent-products', productController.getMostRecentProduct)
router.get('/getbytype/:id', productController.getProductByProductTypes)
router.post('/:id/comments', commentController.setProductUserId, commentController.createComment)
router.get('/most-liked', likeController.getMostLikedProducts)
router.post('/:id/likes', likeController.setProductUserId, likeController.addLikeOnProduct)
router.post('/:id/img-upload', authController.restrictTo('admin'), uploads.single('image'), productController.uploadImage)

router
    .route('/')
    .get(productController.getAllProducts)
    .post(authController.restrictTo('admin'), productController.createProduct)

router
    .route('/:id')
    .get(productController.getProduct)
    .patch(authController.restrictTo('admin'), productController.updateProduct)
    .delete(authController.restrictTo('admin'), productController.deleteProduct)

module.exports = router