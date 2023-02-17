const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const nodemailer = require('nodemailer')

let refreshTokens = []
class AuthController {
    // [POST] /api/auth/register
    register = async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)

            //Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            })

            //Save user to DB
            const user = await newUser.save()
            console.log(user)
            res.status(200).json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    // [POST] /api/auth/login

    login = async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username })
            if (!user) {
                res.status(404).json('Incorrect username')
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password,
            )
            console.log(validPassword)
            if (!validPassword) {
                return res.status(401).send({
                    message: 'Invalid password!',
                })
            }
            if (user && validPassword) {
                // Generate access token
                var accessToken = jwt.sign(
                    {
                        id: user.id,
                        isAdmin: user.isAdmin,
                    },
                    process.env.ACCESS_SECRET_KEY,
                    { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRESIN}s` },
                )
                //   //Generate refresh token
                var refreshToken = jwt.sign(
                    {
                        id: user.id,
                        isAdmin: user.isAdmin,
                    },
                    process.env.REFRESH_SECRET_KEY,
                    {
                        expiresIn: `${process.env.REFRESH_TOKEN_EXPIRESIN}d`,
                    },
                )
                refreshTokens.push(refreshToken)
                //STORE REFRESH TOKEN IN COOKIE
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    //when deploy,set secure true
                    secure: true,
                    path: '/',
                    sameSite: 'strict',
                })
                const { password, _id, ...others } = user._doc
                res.status(200).json({ ...others, accessToken })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    requestRefreshToken = async (req, res) => {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken)
            return res.status(401).json('You are not authenticated')
        if (
            refreshTokens.length !== 0 &&
            !refreshTokens.includes(refreshToken)
        ) {
            return res.status(403).json('Refresh token is not valid')
        }
        jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET_KEY,
            (err, user) => {
                if (err) {
                    console.log(err)
                    return
                }
                refreshTokens = refreshTokens.filter(
                    (token) => token !== refreshToken,
                )
                //Create new accessToken,refreshToken
                var newAccessToken = jwt.sign(
                    {
                        id: user.id,
                        isAdmin: user.isAdmin,
                    },
                    process.env.ACCESS_SECRET_KEY,
                    { expiresIn: `${process.env.ACCESS_TOKEN_EXPIRESIN}s` },
                )
                //   //Generate refresh token
                var newRefreshToken = jwt.sign(
                    {
                        id: user.id,
                        isAdmin: user.isAdmin,
                    },
                    process.env.REFRESH_SECRET_KEY,
                    {
                        expiresIn: `${process.env.REFRESH_TOKEN_EXPIRESIN}d`,
                    },
                )
                refreshTokens.push(newRefreshToken)
                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    // when deploy,set secure true
                    secure: true,
                    path: '/',
                    sameSite: 'strict',
                })
                res.status(200).json({ accessToken: newAccessToken })
            },
        )
    }
    // [POST] api/auth/logout
    logout = (req, res) => {
        //Clear cookies when user logs out
        refreshTokens = refreshTokens.filter(
            (token) => token !== req.body.token,
        )
        res.clearCookie('refreshToken')
        res.status(200).json('Logged out successfully!')
    }

    // [POST] api/auth/forgot-password
    forgotPassword = async (req, res) => {
        const email = req.body.email

        try {
            const oldUser = await User.findOne({ email })
            console.log(oldUser)
            if (oldUser == null) {
                return res.status(404).json({ message: 'User Not Exists!!' })
            }
            const token = jwt.sign(
                { email: oldUser.email, id: oldUser._id },
                process.env.ACCESS_SECRET_KEY,
                {
                    expiresIn: '2m',
                },
            )
            const link = `http://localhost:3000/reset-password/${oldUser._id}/${token}`
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'tuhoangphiem10@gmail.com',
                    pass: 'vdzjpysnetojrjkb',
                },
            })

            var mailOptions = {
                from: 'tuhoangphiem10@gmail.com',
                to: 'tuhoangphiem10@gmail.com',
                subject: 'Password Reset',
                text: `Click this link to reset your password: ${link}`,
            }

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                } else {
                    console.log('Email sent: ' + info.response)
                }
            })
            console.log(link)
            return res
                .status(200)
                .json('Password code has been sent to your email')
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }

    // [POST] api/auth/reset-password/:id/:token
    resetPassword = async (req, res) => {
        const { id, token } = req.params
        const { password } = req.body
        const oldUser = await User.findOne({ _id: id })
        if (!oldUser) {
            return res.status(404).json({ message: "User's not exist" })
        }
        try {
            jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, user) => {
                if (err) {
                    res.status(403).json('Token is not valid!')
                    return
                }
            })
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)
            await User.updateOne({ _id: id }, { password: hashed })
            res.status(200).json('password updated')
        } catch (err) {
            console.log(err)
            res.status(500).json({ status: 'something went wrong' })
        }
    }
}

module.exports = new AuthController()
