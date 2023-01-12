import React, { useState } from 'react'
import { Form, Input, message, Modal, Upload } from 'antd'
import Logout from '../Logout'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import axios from '../../api'
import '../../assets/scss/playlist.scss'
import { useNavigate } from 'react-router-dom'

const Playlist = () => {
  const { TextArea } = Input
  const navigate = useNavigate()

  const [albumImage, setAlbumImage] = useState(null)
  const [albumName, setAlbumName] = useState(null)
  const [albumDesc, setAlbumDesc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpg'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/JPEG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = async () => {
    setIsModalOpen(false)
    try {
      const res = await axios.post('albums/createAlbums', {
        background: albumImage,
        albumName: albumName,
        albumDescription: albumDesc,
      })
      navigate('/my-playlist/' + res.data.album._id)
      window.location.reload()
    } catch (e) {
      console.log(e)
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false)
        setAlbumImage(url)
      })
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )
  return (
    <div className="playlist-container">
      <div className="playlist" onClick={showModal}>
        <div className="image ">
          <Upload
            name="album"
            beforeUpload={beforeUpload}
            listType="picture-card"
            accept=".png,.jpeg,.jpg"
            showUploadList={false}
            onChange={handleChange}
            action={'http://localhost:8080/api/albums/createImageAlbum'}
          >
            {albumImage ? (
              <img
                src={albumImage}
                alt="avatar"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '8px',
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div className="details">
          <span className="type">PLAYLIST</span>
          <span className="title">MY PLAYLIST</span>
          <p className="description"></p>
        </div>
      </div>
      <Modal
        title="Edit details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="album-modal">
          <div className="image image-details">
            <Upload
              name="album"
              beforeUpload={beforeUpload}
              listType="picture-card"
              accept=".png,.jpeg,.jpg"
              showUploadList={false}
              onChange={handleChange}
              action={'http://localhost:8080/api/albums/createImageAlbum'}
            >
              {albumImage ? (
                <img
                  src={albumImage}
                  alt="avatar"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
          <div className="album-form">
            <Form
              form={form}
              name="normal_register"
              className="login-form"
              initialValues={{ remember: true }}
              // onFinish={onFinish}
            >
              <Form.Item name="name">
                <Input
                  onChange={(e) => {
                    setAlbumName(e.target.value)
                  }}
                  value={albumName}
                  placeholder="Add a name"
                />
              </Form.Item>
              <Form.Item name="description">
                <TextArea
                  rows={4}
                  placeholder="Add an optional description"
                  onChange={(e) => {
                    setAlbumDesc(e.target.value)
                  }}
                  value={albumDesc}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
      {/* <ListSong /> */}

      <div className="body__contents"></div>
    </div>
  )
}

export default Playlist
