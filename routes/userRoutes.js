const express = require('express')
const router = express.Router()
const userController = require('./../controller/userController')
const authController = require('./../controller/authController')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/forgotpassword', authController.forgotPassword)
router.patch('/resetpassword/:token', authController.resetPassword)

router.use(authController.protectedRoute)

router.patch('/updateMyPassword', authController.updatePassword)

router.get('/logout', authController.logout)

router.delete('/deleteMe', userController.deleteMe)

router.use(authController.protectedRoute, authController.restrictTo('admin'))

router.patch('/:id', userController.changeUserRole)

router
    .route('/')
    .get(userController.getAllUser)
    .post(userController.createUser)

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)


module.exports = router