import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header'

const Homepage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) navigate('/login')
  }, [])
  console.log(user)
  return <Header />
}

export default Homepage
