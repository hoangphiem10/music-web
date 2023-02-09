import React, { useEffect } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { useDispatch, useSelector } from 'react-redux'
import '../../assets/scss/playerControl.scss'
import { getSongById } from '../../redux/songSlice'

const PlayerControl = () => {
  const song = useSelector((state) => state.song.song)
  const listSong = useSelector((state) => state.song.listsong.songs)
  const dispatch = useDispatch()

  const handleClickPrevious = () => {
    let index
    if (song.track_number === 0) {
      index = listSong.length - 1
    } else {
      index = song.track_number - 1
    }
    const currentTrack = {
      name: listSong[index].name,
      image: listSong[index].image,
      audio: listSong[index].audio,
      track_number: index,
    }
    dispatch(getSongById(currentTrack))
  }

  const handleClickNext = () => {
    let index
    if (song.track_number === listSong.length - 1) {
      index = 0
    } else {
      index = song.track_number + 1
    }
    const currentTrack = {
      name: listSong[index].name,
      image: listSong[index].image,
      audio: listSong[index].audio,
      track_number: index,
    }
    dispatch(getSongById(currentTrack))
  }
  return (
    <div>
      <AudioPlayer
        className="player"
        src={song.audio}
        layout="stacked-reverse"
        showSkipControls={true}
        showJumpControls={false}
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
        onEnded={handleClickNext}
      />
    </div>
  )
}

export default PlayerControl
