const Album = require('../models/Albums.models')
const ListSongs = require('../models/ListSongs.models')
const mongoose = require('mongoose')

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
        const id = req.params.id
        const newSong = new ListSongs(req.body)
        try {
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

    // [PUT] /api/listSongs/updateSong/albumId/:songId
    updateSong = async (req, res) => {
        const { albumId, songId } = req.params

        await Album.findOneAndUpdate(
            {
                _id: new mongoose.Types.ObjectId(albumId),
                'albumListSongs._id': new mongoose.Types.ObjectId(songId),
            },
            {
                $set: {
                    'albumListSongs.$.image': req.body.image,
                    'albumListSongs.$.name': req.body.name,
                    'albumListSongs.$.duration': req.body.duration,
                    'albumListSongs.$.artist': req.body.artist,
                    'albumListSongs.$.albumName': req.body.albumName,
                },
            },
        )
            .then(() => {
                res.status(200).send('updated successfully')
            })
            .catch((error) => {
                res.status(500).send({ message: error })
            })
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
            .then((song) => {
                console.log(song)
                res.status(200).json('Deleted successfully!')
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json({ message: err })
            })
    }
}

module.exports = new ListSongsController()
