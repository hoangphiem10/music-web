const router = require('express').Router()
const Contact = require('../../src/app/controllers/Contact.controllers')

router.post('/createContact', Contact.createContact)

module.exports = router
