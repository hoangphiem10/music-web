const authRouter = require('./auth')
const albumsRouter = require('./albums')
const listSongs = require('./listSongs')

function route(app) {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, Content-Type, Accept',
        )
        next()
    })
    app.use('/api/auth', authRouter)
    app.use('/api/albums', albumsRouter)
    app.use('/api/listSongs', listSongs)
}

module.exports = route
