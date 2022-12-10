import { Divider, Dropdown, Layout, Menu, Space } from 'antd'
import React from 'react'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import Avatar from 'antd/es/avatar/avatar'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import { useDispatch, useSelector } from 'react-redux'
import { logoutSuccess } from '../redux/authSlice'
const Header = () => {
  const user = useSelector((state) => state.auth.login.currentUser)
  const accessToken = user?.accessToken
  const id = user?._id
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let axiosJWT = authService.createAxios(user, dispatch, logoutSuccess)
  const handleLogout = () => {
    authService.logout(dispatch, id, navigate, accessToken, axiosJWT)
  }
  const items = [
    {
      key: '0',
      label: (
        <Link onClick={handleLogout}>
          <Space>
            <LogoutOutlined />
            Logout
          </Space>
        </Link>
      ),
    },
  ]
  return (
    <Layout.Header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      className="header"
    >
      <Dropdown menu={{ items }} placement="bottomLeft">
        <Avatar
          src="https://joeschmoe.io/api/v1/random"
          alt=""
          className="topbarImg"
        />
      </Dropdown>
    </Layout.Header>
  )
}

export default Header
