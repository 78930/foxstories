import { useState, useEffect } from 'react'
import axios from 'axios'

function Menu({ apiUrl }) {
  const [menuItems, setMenuItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      setLoading(true)
      console.log('Fetching from:', `${apiUrl}/menu`)
      const response = await axios.get(`${apiUrl}/menu`)
      setMenuItems(response.data)
      setError('')
    } catch (error) {
      console.error('Error fetching menu:', error)
      console.error('API URL:', apiUrl)
      setError(`Failed to load menu: ${error.message || 'Unknown error'}. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['breakfast', 'lunch', 'dinner', 'desserts', 'beverages']
  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory)

  if (loading) {
    return (
      <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>Loading menu...</p>
      </div>
    )
  }

  return (
    <div>
      <section className="hero" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <h1>Our Menu</h1>
        <p>Explore our delicious offerings</p>
      </section>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        {error && (
          <div style={{ background: '#f8d7da', color: '#721c24', padding: '1rem', borderRadius: '4px', marginBottom: '2rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setSelectedCategory('all')}
            style={{ background: selectedCategory === 'all' ? '#1e40af' : '#3b82f6' }}
          >
            All Items
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{ background: selectedCategory === cat ? '#1e40af' : '#3b82f6' }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>No items available in this category.</p>
          </div>
        ) : (
          <div className="grid">
            {filteredItems.map(item => (
              <div key={item._id} className="card">
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1rem' }} />
                <h3>{item.name}</h3>
                <p style={{ color: '#666', marginBottom: '1rem', minHeight: '2.5rem' }}>{item.description}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  {item.vegetarian && <span className="badge badge-confirmed">🥗 Vegetarian</span>}
                
                  {item.spicy && <span className="badge" style={{ background: '#f8d7da', color: '#721c24' }}>🌶️ Spicy</span>}
                  {!item.available && <span className="badge" style={{ background: '#e2e3e5', color: '#383d41' }}>🚫 Unavailable</span>}
                </div>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
                  ₹{parseFloat(item.price || 0).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Menu
