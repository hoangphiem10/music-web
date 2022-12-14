const Album = require('../models/Albums.models')

class AlbumsController {
    // [GET] /api/albums/getAllAlbums
    getAllAlbums = async (req, res) => {
        await Album.find({}).exec((error, albums) => {
            if (error) {
                res.status(400).send({ message: error })
                return
            }
            res.status(200).send({ albums: albums })
        })
    }
    // [POST] /api/albums/createAlbums
    createAlbums = async (req, res) => {
        const newAlbum = new Album({
            background: req.body.background,
            albumName: req.body.albumName,
            albumDescription: req.body.albumDescription,
        })
        try {
            const savedAlbum = await newAlbum.save()
            res.status(200).send({ album: savedAlbum })
        } catch (error) {
            res.status(400).send({ success: false, msg: error })
        }
    }

    // [PUT] /api/albums/updateAlbum/:id
    updateAlbum = async (req, res) => {
        const id = req.params.id
        const { background, albumName, albumDescription } = req.body
        Album.findByIdAndUpdate(id, {
            background,
            albumName,
            albumDescription,
        })
            .then(res.status(200).json('Updated successfully!'))
            .catch((err) => res.status(400).json({ message: err }))
    }
    // [DELETE] /api/albums/deleteAlbum/:id
    deleteAlbum = (req, res, next) => {
        const id = req.params.id
        Album.findByIdAndRemove(id)
            .then(() => {
                res.status(200).json('Deleted successfully!')
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json({ message: err })
            })
    }
}
module.exports = new AlbumsController()
