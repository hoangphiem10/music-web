const router = require('express').Router()
const AuthController = require('../../src/app/controllers/auth.controllers')
const AuthMiddleware = require('../../src/app/middlewares/auth.middlewares')
const verifySignUp = require('../../src/app/middlewares/verifySignUp')
router.post(
    '/register',
    verifySignUp.checkDuplicateUsernameOrEmail,
    AuthController.register,
)
router.post('/login', AuthController.login)
router.post('/refreshToken', AuthController.requestRefreshToken)
router.post('/logout', AuthMiddleware.verifyToken, AuthController.logout)
router.post('/forgot-password', AuthController.forgotPassword)
router.post('/reset-password/:id/:token', AuthController.resetPassword)

module.exports = router
