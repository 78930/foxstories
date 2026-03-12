import { useState, useEffect } from 'react'
import axios from 'axios'

function Blogs({ apiUrl }) {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${apiUrl}/blogs`)
      setBlogs(response.data)
      setError('')
    } catch (error) {
      console.error('Error fetching blogs:', error)
      setError('Failed to load blogs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>Loading blogs...</p>
      </div>
    )
  }

  return (
    <div>
      <section className="hero" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <h1>Our Blog</h1>
        <p>Stories, recipes, and behind-the-scenes from Fox Stories</p>
      </section>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        {error && (
          <div style={{ background: '#f8d7da', color: '#721c24', padding: '1rem', borderRadius: '4px', marginBottom: '2rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {blogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>No blog posts available yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
            {blogs.map(blog => (
              <div 
                key={blog._id} 
                style={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  background: '#fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'boxShadow 0.3s, transform 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <h2 style={{ marginTop: '0', color: '#1e40af', marginBottom: '0.5rem' }}>
                  {blog.title}
                </h2>
                <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  <strong>By {blog.author}</strong>
                  <br />
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p style={{ color: '#333', lineHeight: '1.6', marginBottom: '1rem' }}>
                  {blog.body}
                </p>
                <div style={{ 
                  padding: '0.75rem 1rem', 
                  background: '#e8f1ff', 
                  borderRadius: '4px', 
                  color: '#1e40af',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  Read more →
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blogs
