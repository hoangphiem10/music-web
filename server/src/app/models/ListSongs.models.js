const mongoose = require('mongoose')
const listSongsSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            default: [],
        },
        name: {
            type: String,
            unique: true,
        },
        audio: {
            type: String,
            unique: true,
        },
        // duration: {
        //     type: String,
        // },
        // artist: {
        //     type: String,
        // },
        // albumName: {
        //     type: String,
        // },
    },
    { timestamps: true },
)

module.exports = mongoose.model('ListSongs', listSongsSchema)
