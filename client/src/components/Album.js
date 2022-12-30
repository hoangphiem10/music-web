import React from 'react'
import { Empty } from 'antd'
import Navbar from './Navbar'
import '../assets/scss/layout.scss'
const Album = () => {
  return (
    <div className="body">
      <Navbar />
      <div className="body__contents">
        <Empty
          style={{ color: 'white' }}
          description={
            <span>
              Click the Create Playlist on the left hand-side to have your own
              album
            </span>
          }
        />
      </div>
    </div>
  )
}

export default Album
