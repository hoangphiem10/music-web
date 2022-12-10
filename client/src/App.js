import { Route, BrowserRouter, Routes, Outlet } from 'react-router-dom'
import { Forgot, Login, Register } from './pages/auth'
import Homepage from './pages/home/Homepage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route element={<Outlet />}>
          <Route index path="/" element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
