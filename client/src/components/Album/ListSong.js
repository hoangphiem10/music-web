import React, { useEffect, useRef, useState } from 'react'
import { AiFillClockCircle } from 'react-icons/ai'
import AddSong from './AddSong'
import '../../assets/scss/listsong.scss'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import getBlobDuration from 'get-blob-duration'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDuration, getSongById } from '../../redux/songSlice'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Form, Input, message, Modal, Space, Upload } from 'antd'
import musicService from '../../services/musicService'
const ListSong = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const albumName = useSelector((state) => state.song.albumName)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [track_number, setTrackNumber] = useState(null)
  const [form] = Form.useForm()
  let listSong = useSelector((state) => state.song.listsong.songs)
  let [editValue, setEditValue] = useState({
    name: '',
    image: '',
    audio: '',
    duration: 0,
    track_number: '',
  })

  useEffect(() => {
    musicService.getAllSongs(id, dispatch)
  }, [dispatch, id])

  useEffect(() => {
    if (form.__INTERNAL__.name) {
      // do form logic here
      form.setFieldsValue({
        name: editValue.name,
        image: editValue.image,
        audio: editValue.audio,
        track_number: editValue.track_number,
      })
    }
  }, [editValue])
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
    musicService.updateSong(
      editValue,
      id,
      listSong[track_number]._id,
      track_number,
      listSong,
      dispatch,
    )
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
        setEditValue({ ...editValue, image: url })
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

  const deleteSong = (index) => {
    Modal.confirm({
      title: 'Are you sure,you want to delete this song?',
      onOk: () => {
        musicService.deleteSong(id, listSong[index]._id, dispatch)
      },
    })
  }
  const msToMinutesAndSeconds = (ms) => {
    var minutes = Math.floor(ms / 60)
    var seconds = (ms % 60).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }
  return (
    <div>
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
              {listSong.map(({ name, image, duration }, index) => {
                return (
                  <>
                    <div
                      className={`row ${index === track_number && 'activeRow'}`}
                      key={index}
                      onClick={(e) => {
                        setTrackNumber(index)
                        const currentTrack = {
                          name: listSong[index].name,
                          image: listSong[index].image,
                          audio: listSong[index].audio,
                          duration: listSong[index].duration,
                          track_number: index,
                        }
                        setEditValue(currentTrack)
                        console.log(currentTrack)
                        dispatch(getSongById(currentTrack))
                      }}
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
                          <span style={{ fontSize: '14px', color: 'grey' }}>
                            TikiTaka
                          </span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{albumName}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                      <div className="col">
                        <Space size="middle" style={{}}>
                          <EditOutlined onClick={showModal} />
                          <DeleteOutlined
                            style={{ color: 'red' }}
                            onClick={() => {
                              deleteSong(index)
                            }}
                          />
                        </Space>
                      </div>
                    </div>
                    <Modal
                      title="Edit your song "
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      key={'modal'}
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
                            {editValue.image ? (
                              <img
                                src={editValue.image}
                                alt="avatar"
                                style={{
                                  width: '100%',
                                  height: '100%',
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
                          >
                            <Form.Item name="name">
                              <Input
                                onChange={(e) => {
                                  setEditValue({
                                    ...editValue,
                                    name: e.target.value,
                                  })
                                }}
                                value={editValue.name}
                                placeholder="Add a name"
                              />
                            </Form.Item>

                            <input
                              name="audio"
                              type="file"
                              onChange={(e) => {
                                if (e.target.files[0]) {
                                  getBlobDuration(e.target.files[0]).then(
                                    function (duration) {
                                      dispatch(getDuration(duration))
                                      setEditValue({
                                        ...editValue,
                                        duration: duration,
                                      })
                                    },
                                  )
                                  getBase64(e.target.files[0], (url) => {
                                    setEditValue({ ...editValue, audio: url })
                                  })
                                }
                              }}
                            />
                          </Form>
                        </div>
                      </div>
                    </Modal>
                  </>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ListSong
