import React, { useState } from 'react'
import { Form, Input, Modal, Upload } from 'antd'
import Logout from './Logout'
import { UploadOutlined, EditOutlined } from '@ant-design/icons'
import edit from '../assets/Images/edit.png'
// import { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import '../assets/scss/playlist.scss'
const Playlist = () => {
  const { TextArea } = Input

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const onFinish = () => {}
  return (
    <div className="playlist-container">
      <div className="playlist" onClick={showModal}>
        <div className="image ">
          <Upload onPreview={true}>
            <div className="imageInn">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1zUdQEs_0BFeILsBbsS_ai-HfEUrIlvP_Fg&usqp=CAU"
                alt="selected playlist"
              />
            </div>
            <div className="hoverImg">
              <img src={edit} alt="selected playlist" />
            </div>
          </Upload>
        </div>
        <div className="details">
          <span className="type">PLAYLIST</span>
          <span className="title">hh</span>
          <p className="description">"hiihi"</p>
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
            <Upload onPreview={true}>
              <div className="imageInn">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1zUdQEs_0BFeILsBbsS_ai-HfEUrIlvP_Fg&usqp=CAU"
                  alt="selected playlist"
                />
              </div>
              <div className="hoverImg">
                <img src={edit} alt="selected playlist" />
              </div>
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
              <Form.Item name="description">
                <TextArea
                  rows={4}
                  placeholder="Add an optional description"
                  onChange={(e) => {
                    // setEmail(e.target.value)
                  }}
                  // value={email}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
      {/* <div className="list">
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
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div> */}

      <div className="body__contents"></div>
    </div>
  )
}

export default Playlist
