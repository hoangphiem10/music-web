const router = require('express').Router()
const AuthController = require('../../src/app/controllers/auth.controllers')
const AuthMiddleware = require('../../src/app/middlewares/auth.middlewares')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/refreshToken', AuthController.requestRefreshToken)
router.post('/logout', AuthMiddleware.verifyToken, AuthController.logout)

module.exports = router
