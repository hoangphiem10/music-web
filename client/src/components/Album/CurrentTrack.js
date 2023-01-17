import React, { useEffect } from 'react'
import axios from '../../api'
import '../../assets/scss/currentTrack.scss'

const CurrentTrack = () => {
  return (
    <div className="Container-currentTrack">
      <div className="track">
        <div className="track__image">
          <img
            src="https://bloganh.net/wp-content/uploads/2020/06/dung-nghieng-nguoi-voi-hoa.jpg"
            alt="currentPlaying"
          />
        </div>
        <div className="track__info">
          <span className="track__info__track__name">hihi</span>
          <span className="track__info__track__artists">
            atatata
            {/* {currentPlaying.artists.join(", ")} */}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CurrentTrack
