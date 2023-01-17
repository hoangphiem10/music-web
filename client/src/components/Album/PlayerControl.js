import React from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import '../../assets/scss/playerControl.scss'

const PlayerControl = () => {
  const handleClickPrevious = () => {}

  const handleClickNext = () => {}
  return (
    <div>
      <AudioPlayer
        className="player"
        src=""
        layout="stacked-reverse"
        showSkipControls={true}
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
        onEnded={handleClickNext}
      />
    </div>
  )
}

export default PlayerControl

{
  /* <div className="Container-playerControl">
<div className="player-control">
  <div className="shuffle">
    <BsShuffle />
  </div>
  <div className="previous">
    <CgPlayTrackPrev />
  </div>
  <div className="state">

    <BsFillPauseCircleFill />
  </div>
  <div className="next">
    <CgPlayTrackNext />
  </div>
  <div className="repeat">
    <FiRepeat />
  </div>
</div>

</div> */
}
