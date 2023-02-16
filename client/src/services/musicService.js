import { message } from 'antd'
import axios from '../api'
import { getListSongs, getSongById } from '../redux/songSlice'

const updateSong = async (
  song,
  albumId,
  songId,
  track_number,
  listSong,
  dispatch,
  user,
  axiosJWT,
) => {
  try {
    await axiosJWT
      .put(
        `listSongs/updateSong/${albumId}/${songId}`,
        {
          image: song.image,
          name: song.name,
          audio: song.audio,
          duration: song.duration,
        },
        { headers: { token: `Bearer ${user.accessToken}` } },
      )
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
      .catch((err) => {
        if (!user.isAdmin) {
          message.error('You are not authorized to edit song')
        }
        console.log(err)
      })
  } catch (err) {
    console.log(err)
  }
}

const deleteSong = async (albumId, songId, dispatch, user, axiosJWT) => {
  await axiosJWT
    .delete(`listSongs/deleteSong/${albumId}/${songId}`, {
      headers: { token: `Bearer ${user.accessToken}` },
    })
    .then((res) => {
      console.log(res.data)
      const listSong = res.data.filter((song) => songId !== song._id)
      // console.log(listSong)
      dispatch(getListSongs(listSong))
      dispatch(getSongById(listSong[0]))
    })
    .catch((err) => {
      if (!user.isAdmin) {
        message.error('You are not authorized to delete song')
      }
      console.log(err)
    })
}

const addSong = async (
  id,
  imageSong,
  nameSong,
  audio,
  duration,
  dispatch,
  user,
  axiosJWT,
) => {
  await axiosJWT
    .post(
      'listSongs/createSong/' + id,
      {
        image: imageSong,
        name: nameSong,
        audio: audio,
        duration: duration,
      },
      {
        headers: { token: `Bearer ${user.accessToken}` },
      },
    )
    .then((res) => {
      dispatch(getListSongs(res.data))
    })
    .catch((err) => {
      if (!user.isAdmin) {
        message.error('You are not authorized to add song')
      }
      console.log(err)
    })
}

const getAllSongs = async (id, dispatch, axiosJWT) => {
  await axios
    .get(`listSongs/getAllSongs/${id}`)
    .then((res) => {
      dispatch(getListSongs(res.data))
    })
    .catch((err) => {
      console.log(err)
    })
}
const createAlbum = async (
  albumImage,
  albumName,
  albumDesc,
  navigate,
  user,
  axiosJWT,
) => {
  // }
  await axiosJWT
    .post(
      'albums/createAlbums',
      {
        background: albumImage,
        albumName: albumName,
        albumDescription: albumDesc,
      },
      {
        headers: { token: `Bearer ${user.accessToken}` },
      },
    )
    .then((res) => {
      navigate('/my-playlist/' + res.data.album._id)
    })
    .catch((err) => {
      if (!user.isAdmin) {
        message.error('You are not authorized to create album')
      }
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
