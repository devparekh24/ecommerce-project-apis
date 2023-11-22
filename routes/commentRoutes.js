const express = require('express')
const commentController = require('../controller/commentController')
const authController = require('../controller/authController')
const router = express.Router({ mergeParams: true })

router.use(authController.protectedRoute)
router
    .route('/')
    .get(commentController.getAllComments)
    .post(commentController.createComment)

router
    .route('/:id')
    .get(commentController.getComment)
    .patch(commentController.updateComment)
    .delete(commentController.deleteComment)

module.exports = router