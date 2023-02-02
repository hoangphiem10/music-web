import React, { useEffect, useState } from 'react'
import { Empty } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import '../../assets/scss/navbar.scss'
import Logout from '../Logout'
import '../../assets/scss/layout.scss'
import { Card, Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAlbumName } from '../../redux/songSlice'
import authService from '../../services/authService'
import { loginSuccess } from '../../redux/authSlice'
import axios from '../../api'
const { Meta } = Card
const Album = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [listAlbum, setListAlbum] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    axios
      .get('albums/getAllAlbums')
      .then((res) => {
        console.log('hihi')

        if (search) {
          const Albums = res.data.albums
          const l = Albums.filter(
            (album) =>
              album.albumName?.toLowerCase().includes(search.toLowerCase()) ||
              album.albumDescription
                ?.toLowerCase()
                .includes(search.toLowerCase()),
          )
          setListAlbum(l)
          console.log(l)
        } else {
          setListAlbum(res.data.albums)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [search])
  return (
    <div className="body">
      <div>
        <div
          className="navbar-Container"
          style={{ padding: '2rem', height: ' 15vh' }}
        >
          <div className="search__bar">
            <SearchOutlined />
            <input
              type="text"
              placeholder="Search songs, descriptions"
              onChange={(e) => {
                setSearch(e.target.value)
              }}
              value={search}
            />
          </div>
          <Logout />
        </div>
      </div>

      <div className="body__contents" style={{ padding: '2rem' }}>
        {listAlbum.length !== 0 ? (
          <Row gutter={[32, 16]}>
            {listAlbum.map((album) => (
              <Col
                key={album._id}
                xs={24}
                sm={12}
                lg={6}
                onClick={() => {
                  dispatch(getAlbumName(album.albumName))
                }}
              >
                <Card
                  hoverable
                  style={{
                    width: 220,
                  }}
                  cover={
                    <img
                      alt="album"
                      src={album.background}
                      style={{ objectFit: 'cover' }}
                    />
                  }
                  onClick={() => {
                    navigate('/my-playlist/' + album._id)
                  }}
                >
                  <Meta
                    title={album.albumName ? album.albumName : 'MY PLAYLIST'}
                    description={
                      album.albumDescription
                        ? album.albumDescription
                        : 'Description'
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty
            style={{ color: 'white' }}
            description={
              <span>
                Click the Create Playlist on the left hand-side to have your own
                album
              </span>
            }
          />
        )}
      </div>
    </div>
  )
}

export default Album
