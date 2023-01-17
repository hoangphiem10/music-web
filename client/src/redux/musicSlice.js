import { createSlice } from '@reduxjs/toolkit'

const musicSlice = createSlice({
  name: 'music',
  initialState: {
    // token: null,
    // userInfo: null,
    playlists: [],
    currentPlaying: null,
    playerState: false,
    selectedPlaylist: null,
    selectedPlaylistId: '',
  },
  reducers: {},
})
