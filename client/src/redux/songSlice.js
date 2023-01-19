import { createSlice } from '@reduxjs/toolkit'

const songSlice = createSlice({
  name: 'song',
  initialState: {
    listsong: {
      songs: null,
    },
    song: {
      name: '',
      image: '',
      audio: '',
      track_number: 0,
    },
    albumName: {
      name: '',
    },
    duration: {
      time: '',
    },
  },
  reducers: {
    getListSongs: (state, action) => {
      state.listsong.songs = action.payload
    },
    getSongById: (state, action) => {
      state.song = action.payload
    },
    getAlbumName: (state, action) => {
      state.albumName = action.payload
    },
    getDuration: (state, action) => {
      state.duration = action.payload
    },
  },
})

export const { getListSongs, getSongById, getAlbumName, getDuration } =
  songSlice.actions
export default songSlice.reducer
