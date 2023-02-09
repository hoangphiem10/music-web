import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from '../../api'
import '../../assets/scss/currentTrack.scss'

const CurrentTrack = () => {
  const song = useSelector((state) => state.song.song)

  return (
    <div className="Container-currentTrack">
      <div className="track">
        <div className="track__image">
          <img
            src={song.image}
            alt="currentPlaying"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="track__info">
          <span className="track__info__track__name">{song.name}</span>
          <span className="track__info__track__artists">
            PT20
            {/* {currentPlaying.artists.join(", ")} */}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CurrentTrack
