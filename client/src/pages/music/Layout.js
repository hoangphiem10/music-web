import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Album, Navbar, Sidebar, Contact } from '../../components'
import '../../assets/scss/layout.scss'
const Layout = ({ component: Component }) => {
  const user = useSelector((state) => state.auth.login?.currentUser)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) navigate('/login')
  }, [])
  return (
    <div className="Container">
      <div className="spotify__body">
        <Sidebar />
        {/* <div className="body">
          <Navbar />
          <div className="body__contents"> */}
        <Component />
        {/* </div>
        </div> */}
      </div>
      <div className="spotify__footer">{/* <Footer /> */}</div>
    </div>
  )
}

export default Layout
