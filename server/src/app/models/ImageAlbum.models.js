const mongoose = require('mongoose')
const ImageAlbumSchema = new mongoose.Schema(
    {
        background: {
            type: String,
        },
    },

    { timestamps: true },
)

module.exports = mongoose.model('ImageAlbum', ImageAlbumSchema)
