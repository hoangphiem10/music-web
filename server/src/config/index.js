const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
async function connect() {
    try {
        // await mongoose.connect(`${process.env.DB}`)
        await mongoose.connect(`mongodb://${process.env.DB}`)

        console.log(process.env.DB, 'Connect successfully!')
    } catch (err) {
        console.log('Connect failed!')
    }
}

module.exports = { connect }
