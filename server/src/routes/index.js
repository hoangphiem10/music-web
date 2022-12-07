const authRouter = require('./auth')
function route(app) {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, Content-Type, Accept',
        )
        next()
    })
    app.use('/api/auth', authRouter)
}

module.exports = route
