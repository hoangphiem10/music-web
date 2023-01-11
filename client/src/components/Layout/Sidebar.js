import React from 'react'
import {
  HomeOutlined,
  PlusSquareOutlined,
  ContactsOutlined,
} from '@ant-design/icons'
import '../../assets/scss/sidebar.scss'

const Sidebar = () => {
  return (
    <div className="sidbar-Container">
      <div className="top__links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="spotify"
          />
        </div>
        <ul>
          <li>
            <HomeOutlined />
            <a href="/">Home</a>
          </li>
          <li>
            <ContactsOutlined />
            <a href="/contact">Contact me</a>
          </li>
        </ul>
      </div>

      <div style={{ paddingBottom: '5px', borderBottom: '1px solid gray' }}>
        <ul>
          <li>
            <PlusSquareOutlined />
            <a href="/my-playlist">Create Playlist</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
