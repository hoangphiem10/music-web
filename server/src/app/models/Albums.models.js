const mongoose = require('mongoose')
const albumsSchema = new mongoose.Schema(
    {
        background: {
            type: Array,
            default: [],
        },
        albumName: {
            type: String,
            unique: true,
        },
        albumDescription: {
            type: String,
        },
        albumListSongs: {
            type: Array,
            default: [],
        },
    },

    { timestamps: true },
)

module.exports = mongoose.model('Albums', albumsSchema)
