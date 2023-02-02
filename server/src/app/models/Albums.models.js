const mongoose = require('mongoose')
const albumsSchema = new mongoose.Schema(
    {
        background: {
            type: String,
            default: '',
        },
        albumName: {
            type: String,
            unique: false,
            default: '',
        },
        albumDescription: {
            type: String,
            default: '',
        },
        albumListSongs: {
            type: Array,
            default: [],
        },
    },

    { timestamps: true },
)

module.exports = mongoose.model('Albums', albumsSchema)
