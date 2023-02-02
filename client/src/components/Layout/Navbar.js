import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import '../../assets/scss/navbar.scss'
import Logout from '../Logout'
const Navbar = () => {
  return (
    <div className="navbar-Container" style={{ padding: '2rem' }}>
      <div className="search__bar">
        <SearchOutlined />
        <input type="text" placeholder="Artists, songs, or podcasts" />
      </div>
      <Logout />
    </div>
  )
}

export default Navbar
