import axios from '../api'
import { getListSongs, getSongById } from '../redux/songSlice'

const updateSong = async (
  song,
  albumId,
  songId,
  track_number,
  listSong,
  dispatch,
) => {
  try {
    await axios
      .put(`listSongs/updateSong/${albumId}/${songId}`, {
        image: song.image,
        name: song.name,
        audio: song.audio,
        duration: song.duration,
      })
      .then((res) => {
        listSong = listSong.map((s, index) => {
          if (index === track_number) {
            const audio = song.audio
            const name = song.name
            const image = song.image
            const duration = song.duration
            return {
              ...song,
              name: name,
              audio: audio,
              duration: duration,
              image: image,
            }
          }
          return s
        })
        dispatch(getListSongs(listSong))
      })
      .catch((err) => console.log(err))
  } catch (err) {
    console.log(err)
  }
}

const deleteSong = async (albumId, songId, dispatch) => {
  await axios
    .delete(`listSongs/deleteSong/${albumId}/${songId}`)
    .then((res) => {
      console.log(res.data)
      const listSong = res.data.filter((song) => songId !== song._id)
      // console.log(listSong)
      dispatch(getListSongs(listSong))
      dispatch(getSongById(listSong[0]))
    })
    .catch((err) => console.log(err))
}

const addSong = async (id, imageSong, nameSong, audio, duration, dispatch) => {
  await axios
    .post('listSongs/createSong/' + id, {
      image: imageSong,
      name: nameSong,
      audio: audio,
      duration: duration,
    })
    .then((res) => {
      dispatch(getListSongs(res.data))
    })
    .catch((err) => console.log(err))
}

const getAllSongs = async (id, dispatch) => {
  await axios
    .get(`listSongs/getAllSongs/${id}`)
    .then((res) => {
      // console.log(res)
      dispatch(getListSongs(res.data))
    })
    .catch((err) => {
      console.log(err)
    })
}
const createAlbum = async (albumImage, albumName, albumDesc, navigate) => {
  await axios
    .post('albums/createAlbums', {
      background: albumImage,
      albumName: albumName,
      albumDescription: albumDesc,
    })
    .then((res) => {
      navigate('/my-playlist/' + res.data.album._id)
    })
    .catch((err) => {
      console.log(err)
    })
}

const musicService = {
  updateSong,
  getAllSongs,
  deleteSong,
  addSong,
  createAlbum,
}
export default musicService
