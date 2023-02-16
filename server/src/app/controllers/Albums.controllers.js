const { cloudinary } = require('../../utils/cloundinary')
const Album = require('../models/Albums.models')
const ImageAlbum = require('../models/ImageAlbum.models')

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
        try {
            const fileStr = req.body.background
            const uploadResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'album',
            })
            const newAlbum = new Album({
                background: uploadResponse.url,
                albumName: req.body.albumName,
                albumDescription: req.body.albumDescription,
            })
            const savedAlbum = await newAlbum.save()
            res.status(200).send({ album: savedAlbum })
        } catch (error) {
            console.error(error)
            res.status(400).send({ success: false, msg: error })
        }
    }
    // [POST] /api/albums/createImageAlbum
    createImageAlbum = async (req, res) => {
        const newAlbum = new ImageAlbum({
            background: req.body.background,
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
        try {
            const id = req.params.id
            const fileStr = req.body.background
            const uploadResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'album',
            })
            // console.log(uploadResponse.url)
            const background = uploadResponse.url
            const albumName = req.body.albumName
            const albumDescription = req.body.albumDescription
            Album.findByIdAndUpdate(id, {
                background,
                albumName,
                albumDescription,
            })
                .then((album) => res.status(200).json({ album }))
                .catch((err) => res.status(400).json({ message: err }))
        } catch (error) {
            res.status(400).send({ success: false, msg: error })
        }
    }
    // [GET] /api/albums/getAnAlbum/:albumId
    getAnAlbum = async (req, res) => {
        const id = req.params.albumId

        await Album.findById(id).exec((error, album) => {
            if (error) {
                res.status(400).send({ message: error })
                return
            }
            res.status(200).send({ album: album })
        })
    }
    // [DELETE] /api/albums/deleteAlbum/:id
    deleteAlbum = (req, res, next) => {
        const id = req.params.id
        Album.findByIdAndRemove(id)
            .then((album) => {
                res.status(200).send({ album })
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json({ message: err })
            })
    }
}
module.exports = new AlbumsController()
