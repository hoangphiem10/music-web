import React, { useEffect, useRef, useState } from 'react'
import { AiFillClockCircle } from 'react-icons/ai'
import AddSong from './AddSong'
import '../../assets/scss/listsong.scss'
import Logout from '../Logout'
import { useParams } from 'react-router-dom'
import axios from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import { getListSongs, getSongById } from '../../redux/songSlice'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Space } from 'antd'
const ListSong = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const listSong = useSelector((state) => state.song.listsong.songs)

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(`listSongs/getAllSongs/${id}`)
      // console.log()
      dispatch(getListSongs(response.data))
      // dispatch(getSongById(response.albumListSongs[0]))
    }
    getInitialPlaylist()
  }, [])
  console.log(listSong)

  return (
    <>
      <AddSong />
      <div className="Container-listsong">
        {listSong && (
          <div className="list">
            <div className="header-row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
              <div className="col">
                <span>Action</span>
              </div>
            </div>
            <div className="tracks">
              {listSong.map(
                (
                  {
                    name,
                    image,
                    // duration,
                    // album,
                    // context_uri,
                    // track_number,
                  },
                  index,
                ) => {
                  return (
                    <div className="row" key={index}>
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span style={{ fontSize: '14px', color: 'grey' }}>
                            PT20
                          </span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{}</span>
                      </div>
                      <div className="col">
                        {/* <span>{msToMinutesAndSeconds(duration)}</span> */}
                      </div>
                      <div className="col">
                        <Space size="middle" style={{}}>
                          <EditOutlined
                            onClick={() => {
                              console.log('hihi')
                            }}
                          />
                          <DeleteOutlined
                            style={{ color: 'red' }}
                            onClick={() => {
                              console.log('hihi')
                            }}
                          />
                        </Space>
                      </div>
                    </div>
                  )
                },
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ListSong
