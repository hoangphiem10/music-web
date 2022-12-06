import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Login } from './pages/auth'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
