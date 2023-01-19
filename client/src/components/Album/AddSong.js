import { Button, Form, Input, message, Modal, Space, Upload } from 'antd'
import React, { useState, useEffect } from 'react'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import '../../assets/scss/addsong.scss'
import axios from '../../api'
import { useParams } from 'react-router-dom'
import getBlobDuration from 'get-blob-duration'
import { useDispatch } from 'react-redux'
import { getDuration } from '../../redux/songSlice'

const AddSong = () => {
  const { id } = useParams()
  const { TextArea } = Input
  const [imageSong, setImageSong] = useState('')
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [nameSong, setNameSong] = useState('')
  const [audio, setAudio] = useState(null)
  const [duration, setDuration] = useState(null)

  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
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
  const handleOk = () => {
    setIsModalOpen(false)
    axios
      .post('listSongs/createSong/' + id, {
        image: imageSong,
        name: nameSong,
        audio: audio,
        duration: duration,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    window.location.reload()
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
        setImageSong(url)
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
  const onFinish = () => {}
  return (
    <Space style={{ margin: '20px 0' }} align="end">
      <Button
        //   href="/manage-products/Add"
        onClick={showModal}
        type="primary"
        icon={<PlusOutlined />}
        size="medium"
      >
        Add Song
      </Button>
      <Modal
        title="Add your song "
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
              action="http://localhost:8080/api/albums/createImageAlbum"
            >
              {imageSong ? (
                <img
                  src={imageSong}
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
              onFinish={onFinish}
            >
              <Form.Item name="name">
                <Input
                  onChange={(e) => {
                    setNameSong(e.target.value)
                  }}
                  value={nameSong}
                  placeholder="Add a name"
                />
              </Form.Item>

              {/* <Form.Item name="song"> */}
              <input
                type="file"
                name="audio"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    getBlobDuration(e.target.files[0]).then(function (
                      duration,
                    ) {
                      setDuration(duration)
                    })

                    getBase64(e.target.files[0], (url) => {
                      setAudio(url)
                    })
                  }
                }}
              />
            </Form>
          </div>
        </div>
      </Modal>
    </Space>
  )
}

export default AddSong
