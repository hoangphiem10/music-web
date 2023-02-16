const mongoose = require('mongoose')
const listSongsSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            unique: true,
        },
        audio: {
            type: String,
            unique: true,
        },
        duration: {
            type: Number,
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model('ListSongs', listSongsSchema)
