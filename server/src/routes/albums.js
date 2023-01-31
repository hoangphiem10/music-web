const router = require('express').Router()
const AlbumsController = require('../../src/app/controllers/Albums.controllers')
const AuthMiddleware = require('../../src/app/middlewares/auth.middlewares')

router.get('/getAllAlbums', AlbumsController.getAllAlbums)
router.post(
    '/createAlbums',
    AuthMiddleware.verifyTokenAndAdminAuthorization,
    AlbumsController.createAlbums,
)
router.post('/createImageAlbum', AlbumsController.createImageAlbum)
router.put(
    '/updateAlbum/:id',
    AuthMiddleware.verifyTokenAndAdminAuthorization,
    AlbumsController.updateAlbum,
)
router.get('/getAnAlbum/:albumId', AlbumsController.getAnAlbum)
router.delete(
    '/deleteAlbum/:id',
    AuthMiddleware.verifyTokenAndAdminAuthorization,
    AlbumsController.deleteAlbum,
)

module.exports = router
