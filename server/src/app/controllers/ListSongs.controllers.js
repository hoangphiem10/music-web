const Album = require('../models/Albums.models')
const ListSongs = require('../models/ListSongs.models')
const mongoose = require('mongoose')
const { cloudinary } = require('../../utils/cloundinary')

class ListSongsController {
    // [GET] /api/listSongs/getAllSongs/:id
    getAllSongs = async (req, res) => {
        const id = req.params.id

        await Album.findOne({ _id: id })
            .then((album) => {
                res.status(200).send(album.albumListSongs)
            })
            .catch((error) => res.status(500).send({ message: error }))
    }

    // [POST] /api/listSongs/createSong/:id
    createSong = async (req, res) => {
        try {
            const id = req.params.id
            const fileStr = req.body.audio
            const uploadAudio = await cloudinary.uploader.upload(fileStr, {
                resource_type: 'video',
                upload_preset: 'album',
            })
            const fileImage = req.body.image
            const uploadImage = await cloudinary.uploader.upload(fileImage, {
                upload_preset: 'album',
            })
            const newSong = new ListSongs({
                ...req.body,
                audio: uploadAudio.url,
                image: uploadImage.url,
            })
            await Album.findOne({ _id: id })
                .then((album) => {
                    album.albumListSongs.push(newSong)
                    album.save()
                    res.status(200).send(album.albumListSongs)
                })
                .catch((error) => {
                    console.log(error)
                    res.status(500).send({ message: error })
                })
        } catch (err) {
            res.status(500).send({ message: err })
        }
    }

    // [PUT] /api/listSongs/updateSong/:albumId/:songId
    updateSong = async (req, res) => {
        try {
            const { albumId, songId } = req.params
            const fileAudio = req.body.audio
            const uploadAudio = await cloudinary.uploader.upload(fileAudio, {
                resource_type: 'video',
                upload_preset: 'album',
            })
            const fileImage = req.body.image
            const uploadImage = await cloudinary.uploader.upload(fileImage, {
                upload_preset: 'album',
            })
            await Album.findOneAndUpdate(
                {
                    _id: new mongoose.Types.ObjectId(albumId),
                    'albumListSongs._id': new mongoose.Types.ObjectId(songId),
                },
                {
                    $set: {
                        'albumListSongs.$.image': uploadImage.url,
                        'albumListSongs.$.name': req.body.name,
                        'albumListSongs.$.audio': uploadAudio.url,
                        'albumListSongs.$.duration': req.body.duration,
                    },
                },
            )
                .then((album) => {
                    res.status(200).send(album.albumListSongs)
                })
                .catch((error) => {
                    res.status(500).send({ message: error })
                })
        } catch (err) {
            res.status(500).send({ message: err })
        }
    }
    // [DELETE] /api/listSongs/deleteSong/:albumId/:songId
    deleteSong = (req, res) => {
        const { albumId, songId } = req.params
        Album.findOneAndUpdate(
            {
                _id: new mongoose.Types.ObjectId(albumId),
            },
            {
                $pull: {
                    albumListSongs: {
                        _id: new mongoose.Types.ObjectId(songId),
                    },
                },
            },
        )
            .then((album) => {
                res.status(200).send(album.albumListSongs)
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json({ message: err })
            })
    }
}

module.exports = new ListSongsController()
