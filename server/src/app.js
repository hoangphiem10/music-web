const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http')
const server = http.createServer(app)
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
dotenv.config()

app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'https://pt20-music-web.onrender.com',
            'https://exquisite-choux-250f1c.netlify.app/login',
        ],
        credentials: true,
    }),
)
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())

require('./routes')(app)
require('./config/index').connect()

server.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('Server is running at PORT: ', process.env.PORT)
})
