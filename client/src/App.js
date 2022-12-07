import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Forgot, Login, Register } from './pages/auth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<Forgot />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
