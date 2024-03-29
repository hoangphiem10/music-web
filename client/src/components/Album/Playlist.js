import React, { useEffect, useState } from 'react'
import { Form, Input, message, Modal, Upload } from 'antd'
import Logout from '../Logout'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import axios from '../../api'
import '../../assets/scss/playlist.scss'
import ListSong from './ListSong'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAlbumName } from '../../redux/songSlice'
import SearchBar from './SearchBar'
import authService from '../../services/authService'
import { loginSuccess } from '../../redux/authSlice'
const Playlist = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.login.currentUser)
  const accessToken = user?.accessToken ? user?.accessToken : null
  let axiosJWT = authService.createAxios(user, dispatch, loginSuccess, navigate)
  const { TextArea } = Input
  const { id } = useParams()
  const [albumImage, setAlbumImage] = useState(null)
  let [editValue, setEditValue] = useState({
    albumName: '',
    albumDescription: '',
  })
  // let listSong = useSelector((state) => state.song.listsong.songs)

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
      await axiosJWT
        .put(
          'albums/updateAlbum/' + id,
          {
            background: albumImage,
            albumName: editValue.albumName,
            albumDescription: editValue.albumDescription,
          },
          { headers: { token: `Bearer ${accessToken}` } },
        )
        .then(() => dispatch(getAlbumName(editValue.albumName)))
        .catch((err) => {
          if (!user.isAdmin) {
            message.error('You are not authorized to edit Album')
          }
        })
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
      console.log(loading)
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
  useEffect(() => {
    axios.get('albums/getAnAlbum/' + id).then((res) => {
      // setAlbum(res.data.album)
      setEditValue(res.data.album)
      console.log(res.data.album)
      setAlbumImage(res.data.album?.background)
    })
  }, [id])

  useEffect(() => {
    if (form.__INTERNAL__.name) {
      // do form logic here
      form.setFieldsValue({
        name: editValue.albumName,
        description: editValue.albumDescription,
      })
    }
  }, [editValue])
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
      <div className="navbar-Container">
        <SearchBar />
        <Logout />
      </div>
      <div className="playlist" onClick={showModal}>
        <div className="image ">
          <Upload
            name="album"
            beforeUpload={beforeUpload}
            listType="picture-card"
            showUploadList={false}
            onChange={handleChange}
            action={
              'https://pt20s-music.onrender.com/api/albums/createImageAlbum'
            }
          >
            {albumImage ? (
              <img
                src={albumImage}
                alt="avatar"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div className="details">
          <span className="type">PLAYLIST</span>
          <span className="title">
            {editValue?.albumName ? editValue?.albumName : 'MY PLAYLIST'}
          </span>
          <p className="description">
            {editValue?.albumDescription
              ? editValue?.albumDescription
              : 'Description'}
          </p>
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
              showUploadList={false}
              onChange={handleChange}
              action={
                'https://pt20s-music.onrender.com/api/api/albums/createImageAlbum'
              }
            >
              {albumImage ? (
                <img
                  src={albumImage}
                  alt="avatar"
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px',
                    objectFit: 'cover',
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
                    setEditValue({ ...editValue, albumName: e.target.value })
                  }}
                  value={editValue?.albumName}
                  placeholder="Add a name"
                />
              </Form.Item>
              <Form.Item name="description">
                <TextArea
                  rows={4}
                  placeholder="Add an optional description"
                  onChange={(e) => {
                    setEditValue({
                      ...editValue,
                      albumDescription: e.target.value,
                    })
                  }}
                  value={editValue?.albumDescription}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
      <ListSong />
    </div>
  )
}

export default Playlist
