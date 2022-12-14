const router = require('express').Router()
const ListSongsController = require('../../src/app/controllers/ListSongs.controllers')
router.get('/getAllSongs/:id', ListSongsController.getAllSongs)
router.post('/createSong/:id', ListSongsController.createSong)
router.put('/updateSong/:albumId/:songId', ListSongsController.updateSong)
router.delete('/deleteSong/:albumId/:songId', ListSongsController.deleteSong)

module.exports = router
