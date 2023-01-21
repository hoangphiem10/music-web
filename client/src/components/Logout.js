import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import '../assets/scss/logout.scss'
import { Popconfirm, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import authService from '../services/authService'
import { logoutSuccess } from '../redux/authSlice'

const Logout = () => {
  const user = useSelector((state) => state.auth.login.currentUser)
  const accessToken = user?.accessToken
  const id = user?._id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let axiosJWT = authService.createAxios(user, dispatch, logoutSuccess)
  const handleLogout = () => {
    authService.logout(dispatch, id, navigate, accessToken, axiosJWT)
  }
  return (
    <div className="avatar">
      <Popconfirm
        title="Are you sure you want to logout?"
        okText="Yes"
        cancelText="No"
        onConfirm={handleLogout}
      >
        <Space className="logout">
          <UserOutlined />
          <span>{user?.username}</span>
        </Space>
      </Popconfirm>
    </div>
  )
}

export default Logout
