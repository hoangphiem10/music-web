const User = require('../models/User')

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        username: req.body.username,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: `checkDuplicateUsernameOrEmail: username ${err}`,
            })
            return
        }

        if (user) {
            res.status(400).send({
                message: 'Failed! Username already in use!',
            })
            return
        }

        User.findOne({
            email: req.body.email,
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({
                    message: `checkDuplicateUsernameOrEmail: email ${err}`,
                })
                return
            }

            if (user) {
                res.status(400).send({
                    message: 'Failed! Email already in use!',
                })
                return
            }

            next()
        })
    })
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
}

module.exports = verifySignUp
