import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AdminLogin({ apiUrl, onLoginSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await axios.post(`${apiUrl}/admin/login`, form)
      localStorage.setItem('adminToken', response.data.token)
      onLoginSuccess(response.data.token)
      navigate('/admin')
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <section className="hero" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <h1>Admin Login</h1>
        <p>Access your admin dashboard</p>
      </section>

      <div className="container">
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Dashboard</h2>

          {error && (
            <div style={{ background: '#f8d7da', border: '1px solid #f5c6cb', color: '#721c24', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
              ❌ {error}
            </div>
          )}

          <div>
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              placeholder="admin@foxstories.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Password *</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
