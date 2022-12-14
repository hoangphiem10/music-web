const router = require('express').Router()
const AlbumsController = require('../../src/app/controllers/Albums.controllers')

router.get('/getAllAlbums', AlbumsController.getAllAlbums)
router.post('/createAlbums', AlbumsController.createAlbums)
router.put('/updateAlbum/:id', AlbumsController.updateAlbum)
router.delete('/deleteAlbum/:id', AlbumsController.deleteAlbum)

module.exports = router
