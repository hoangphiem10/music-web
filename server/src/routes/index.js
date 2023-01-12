const authRouter = require('./auth')
const albumsRouter = require('./albums')
const listSongs = require('./listSongs')
const contact = require('./contact')
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
    app.use('/api/contact', contact)
}

module.exports = route
