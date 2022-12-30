import { Route, BrowserRouter, Routes, Outlet } from 'react-router-dom'
import { Forgot, Login, Register, Reset } from './pages/auth'
import { Home, ContactPage, MyPlaylist } from './pages/music'

function App() {
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
          <Route path="my-playlist/:id" element={<MyPlaylist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
