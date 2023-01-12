const router = require('express').Router()
const AlbumsController = require('../../src/app/controllers/Albums.controllers')

router.get('/getAllAlbums', AlbumsController.getAllAlbums)
router.post('/createAlbums', AlbumsController.createAlbums)
router.post('/createImageAlbum', AlbumsController.createImageAlbum)
router.put('/updateAlbum/:id', AlbumsController.updateAlbum)
router.get('/getAnAlbum/:albumId', AlbumsController.getAnAlbum)
router.delete('/deleteAlbum/:id', AlbumsController.deleteAlbum)

module.exports = router
