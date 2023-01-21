import React, { useEffect, useState } from 'react'
import { Empty } from 'antd'
import axios from '../../api'
import { SearchOutlined } from '@ant-design/icons'
import '../../assets/scss/navbar.scss'
import Logout from '../Logout'
import '../../assets/scss/layout.scss'
import { Card, Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAlbumName } from '../../redux/songSlice'

const { Meta } = Card
const Album = () => {
  const navigate = useNavigate()
  const [listAlbum, setListAlbum] = useState([])
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get('albums/getAllAlbums').then((res) => {
      if (search) {
        const Albums = res.data.albums
        setListAlbum(
          Albums.filter(
            (album) =>
              album.albumName.toLowerCase().includes(search.toLowerCase()) ||
              album.albumDescription
                .toLowerCase()
                .includes(search.toLowerCase()),
          ),
        )
        console.log(search)
      } else {
        setListAlbum(res.data.albums)
      }
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

      <div className="body__contents" style={{ paddingLeft: '2.5em' }}>
        {listAlbum.length !== 0 ? (
          <Row gutter={[16, 32]}>
            {listAlbum.map((album) => (
              <Col
                key={album._id}
                span={6}
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
