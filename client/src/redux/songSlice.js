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
      track_number: 0,
    },
  },
  reducers: {
    getListSongs: (state, action) => {
      state.listsong.songs = action.payload
    },
    getSongById: (state, action) => {
      state.song = action.payload
    },
  },
})

export const { getListSongs, getSongById } = songSlice.actions
export default songSlice.reducer
