const router = require('express').Router()
const Contact = require('../../src/app/controllers/Contact.controllers')
const AuthMiddleware = require('../../src/app/middlewares/auth.middlewares')

router.post('/createContact', AuthMiddleware.verifyToken, Contact.createContact)

module.exports = router
