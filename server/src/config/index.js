const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect(`mongodb://${process.env.DB}`)

        console.log(process.env.DB, 'Connect successful!')
    } catch (err) {
        console.log('Connect failed!')
    }
}

module.exports = { connect }
