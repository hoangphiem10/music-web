const router = require('express').Router()
const ListSongsController = require('../../src/app/controllers/ListSongs.controllers')
const AuthMiddleware = require('../../src/app/middlewares/auth.middlewares')

router.get('/getAllSongs/:id', ListSongsController.getAllSongs)
router.post(
    '/createSong/:id',
    AuthMiddleware.verifyTokenAndAdminAuthorization,
    ListSongsController.createSong,
)
router.put(
    '/updateSong/:albumId/:songId',
    AuthMiddleware.verifyTokenAndAdminAuthorization,
    ListSongsController.updateSong,
)
router.delete(
    '/deleteSong/:albumId/:songId',
    AuthMiddleware.verifyTokenAndAdminAuthorization,
    ListSongsController.deleteSong,
)

module.exports = router
