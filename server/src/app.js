const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http')
const server = http.createServer(app)
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
dotenv.config()

app.use(
    cors({
        origin: 'http://localhost:3000',
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
