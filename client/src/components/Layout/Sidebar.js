import React, { useEffect, useState } from 'react'
import {
  HomeOutlined,
  PlusSquareOutlined,
  ContactsOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import axios from '../../api'

import '../../assets/scss/sidebar.scss'
import { useNavigate } from 'react-router-dom'
import { message, Popconfirm } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../../redux/authSlice'
import authService from '../../services/authService'

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.login.currentUser)
  const accessToken = user?.accessToken ? user?.accessToken : null
  let axiosJWT = authService.createAxios(user, dispatch, loginSuccess, navigate)
  // console.log(axiosJWT)
  const [playlist, setPlaylist] = useState(null)
  useEffect(() => {
    axios
      .get('albums/getAllAlbums', {
        // headers: { token: `Bearer ${accessToken}` },
      })
      .then((res) => {
        setPlaylist(res.data.albums)
      })
  }, [])
  const deleteAlbum = async (id) => {
    await axiosJWT
      .delete(`albums/deleteAlbum/${id}`, {
        headers: { token: `Bearer ${accessToken}` },
      })
      .then((res) => {
        const listAlbum = playlist.filter((album) => album._id !== id)
        setPlaylist(listAlbum)
        console.log(listAlbum)
        if (listAlbum.length !== 0) {
          navigate(`/my-playlist/${listAlbum[0]._id}`)
        } else {
          navigate('/')
        }
      })
      .catch((err) => {
        if (!user.isAdmin) {
          message.error('You are not authorized to do delete Album')
        }
        console.log(err.response)
      })
  }
  return (
    <div className="sidbar-Container">
      <div className="top__links">
        <div className="logo">
          <img
            // src="https://i.pinimg.com/736x/15/3d/e7/153de74acdee27703cc7d6ad7e2009a9.jpg"
            // src="https://i.pinimg.com/564x/bf/5e/3c/bf5e3ce432a78f1ce15db55ba5ef6903.jpg"
            src="https://i.pinimg.com/474x/dc/a7/54/dca7548a465787dc51f00daf40718bf3.jpg"
            alt="logo"
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
      <div className="playlist-sidebar">
        <ul>
          {playlist?.map((album) => {
            return (
              <li
                key={album._id}
                onClick={() => {
                  navigate(`/my-playlist/${album._id}`)
                }}
              >
                {album.albumName}
                <Popconfirm
                  title="Are you sure you want to logout?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={(e) => {
                    e.stopPropagation()
                    deleteAlbum(album._id)
                  }}
                >
                  <DeleteOutlined style={{ color: 'red', fontSize: '14px' }} />
                </Popconfirm>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
