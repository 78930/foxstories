import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import Menu from './pages/Menu'
import Blogs from './pages/Blogs'
import Reservations from './pages/Reservations'
import Orders from './pages/Orders'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'

// Dev: Use Vite proxy (/api) to avoid CORS | Prod: Use full URL from .env
const API_URL = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL 
  : (import.meta.env.MODE === 'production' 
? 'https://foxstories.onrender.com/api'    : '/api')

function AppContent() {
  const [adminToken, setAdminToken] = useState(() => {
    try {
      return localStorage.getItem('adminToken') || null
    } catch (e) {
      console.error('localStorage error:', e)
      return null
    }
  })
  const navigate = useNavigate()

  const handleLogout = () => {
    setAdminToken(null)
    try {
      localStorage.removeItem('adminToken')
    } catch (e) {
      console.error('Error removing token:', e)
    }
    navigate('/')
  }

  const handleLoginSuccess = (token) => {
    setAdminToken(token)
    try {
      localStorage.setItem('adminToken', token)
    } catch (e) {
      console.error('Error saving token:', e)
    }
    navigate('/admin')
  }

  return (
    <div className="app">
      <header>
        <div className="container">
          <h1>🦊 Fox Stories Cafe</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/blogs">Blog</Link>
            <Link to="/reservations">Reserve</Link>
            <Link to="/orders">Orders</Link>
            {adminToken ? (
              <>
                <Link to="/admin">Dashboard</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to="/admin-login">Admin</Link>
            )}
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs apiUrl={API_URL} />} />
          <Route path="/menu" element={<Menu apiUrl={API_URL} />} />
          <Route path="/reservations" element={<Reservations apiUrl={API_URL} />} />
          <Route path="/orders" element={<Orders apiUrl={API_URL} />} />
          <Route path="/admin-login" element={<AdminLogin apiUrl={API_URL} onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/admin" element={adminToken ? <AdminDashboard apiUrl={API_URL} token={adminToken} /> : <Navigate to="/admin-login" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2026 Fox Stories Cafe. All rights reserved.</p>
          <p>📍 Your Favorite Cafe | 📞 8885653460</p>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
