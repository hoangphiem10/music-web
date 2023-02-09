const nodemailer = require('nodemailer')

class ContactController {
    // [POST] /api/contact/createContact
    createContact = async (req, res) => {
        try {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'tuhoangphiem10@gmail.com',
                    pass: 'vdzjpysnetojrjkb',
                },
            })
            var mailOptions = {
                from: req.body.email,
                to: 'tuhoangphiem10@gmail.com',
                subject: `${req.body.firstname} ${req.body.lastname} contact for work`,
                text: req.body.message,
            }
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Email sent: ' + info.response)
                }
            })
            return res.status(200).json('message have been sent to your email')
        } catch (error) {
            res.status(400).send({ success: false, msg: error })
        }
    }
}

module.exports = new ContactController()
