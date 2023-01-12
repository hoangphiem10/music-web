import React, { useEffect, useState } from 'react'
import { Empty } from 'antd'
import axios from '../../api'
import { SearchOutlined } from '@ant-design/icons'
import '../../assets/scss/navbar.scss'
import Logout from '../Logout'
import '../../assets/scss/layout.scss'
import { Card, Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'

const { Meta } = Card
const Album = () => {
  const navigate = useNavigate()
  const [listAlbum, setListAlbum] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('albums/getAllAlbums').then((res) => {
      if (search) {
        const Albums = res.data.albums
        setListAlbum(
          Albums.filter(
            (album) =>
              album.albumName.toLowerCase().includes(search) ||
              album.albumDescription.toLowerCase().includes(search),
          ),
        )
      } else {
        setListAlbum(res.data.albums)
      }
    })
  }, [search])
  return (
    <div className="body">
      <div>
        <div className="navbar-Container">
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

      <div className="body__contents">
        {listAlbum ? (
          <Row gutter={[16, 32]}>
            {listAlbum.map((album) => (
              <Col key={album._id} span={6}>
                <Card
                  hoverable
                  style={{
                    width: 220,
                  }}
                  cover={<img alt="album" src={album.background} />}
                  onClick={() => {
                    navigate('/my-playlist/' + album._id)
                  }}
                >
                  <Meta
                    title={album.albumName}
                    description={album.albumDescription}
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