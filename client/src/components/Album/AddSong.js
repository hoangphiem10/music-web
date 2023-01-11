import { Button, Form, Input, message, Modal, Space, Upload } from 'antd'
import React, { useState } from 'react'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'

const AddSong = () => {
  const { TextArea } = Input
  const [imageSong, setImageSong] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
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
        Add More
      </Button>
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
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            >
              {/* <div className="imageInn">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1zUdQEs_0BFeILsBbsS_ai-HfEUrIlvP_Fg&usqp=CAU"
                  alt="selected playlist"
                />
              </div>
              <div className="hoverImg">
                <img src={edit} alt="selected playlist" />
              </div> */}
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
                    // setUsername(e.target.value)
                  }}
                  // value={username}
                  placeholder="Add a name"
                />
              </Form.Item>
              <Form.Item name="author">
                <Input
                  onChange={(e) => {
                    // setUsername(e.target.value)
                  }}
                  // value={username}
                  placeholder="Add author"
                />
              </Form.Item>
              <Form.Item name="album">
                <Input
                  onChange={(e) => {
                    // setUsername(e.target.value)
                  }}
                  // value={username}
                  placeholder="Add album name"
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </Space>
  )
}

export default AddSong
