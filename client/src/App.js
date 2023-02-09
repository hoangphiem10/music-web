import React, { useState, useEffect } from 'react'
import { Route, BrowserRouter, Routes, Outlet } from 'react-router-dom'
import { Forgot, Login, Register, Reset } from './pages/auth'
import { Home, ContactPage, Album, MyPlaylist } from './pages/music'

function App() {
  const [isLoading, setLoading] = useState(true)
  function someRequest() {
    //Simulates a request; makes a "promise" that'll run for 1.5 seconds
    return new Promise((resolve) => setTimeout(() => resolve(), 1500))
  }
  useEffect(() => {
    someRequest().then(() => {
      const loaderElement = document.querySelector('.loader-container')
      if (loaderElement) {
        loaderElement.remove()
        setLoading(!isLoading)
      }
    })
  })
  if (isLoading) {
    return null
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/reset-password/:id/:token" element={<Reset />} />

        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="my-playlist" element={<Album />} />
          <Route path="my-playlist/:id" element={<MyPlaylist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
