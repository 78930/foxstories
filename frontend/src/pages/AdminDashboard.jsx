import { useState, useEffect } from 'react'
import axios from 'axios'

function AdminDashboard({ apiUrl, token }) {
  const [activeTab, setActiveTab] = useState('reservations')
  const [reservations, setReservations] = useState([])
  const [orders, setOrders] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddMenuItem, setShowAddMenuItem] = useState(false)
  const [sendingWhatsApp, setSendingWhatsApp] = useState(false)
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'breakfast',
    image: 'https://via.placeholder.com/300x200?text=No+Image',
    available: true,
    vegetarian: false,
    spicy: false
  })
  const [message, setMessage] = useState('')

  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    setLoading(true)
    setMessage('')
    try {
      if (activeTab === 'reservations') {
        const response = await axios.get(`${apiUrl}/reservations`, { headers })
        setReservations(response.data)
      } else if (activeTab === 'orders') {
        const response = await axios.get(`${apiUrl}/orders`, { headers })
        setOrders(response.data)
      } else if (activeTab === 'menu') {
        const response = await axios.get(`${apiUrl}/menu`)
        setMenuItems(response.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setMessage('Error loading data: ' + (error.response?.data?.message || error.message))
    }
    setLoading(false)
  }

  const addMenuItem = async () => {
    try {
      if (!newItem.name || !newItem.price || !newItem.category) {
        setMessage('Please fill in all required fields')
        return
      }
      await axios.post(`${apiUrl}/menu`, newItem, { headers })
      setMessage('Menu item added successfully!')
      setShowAddMenuItem(false)
      setNewItem({
        name: '',
        description: '',
        price: '',
        category: 'breakfast',
        image: 'https://via.placeholder.com/300x200?text=No+Image',
        available: true,
        vegetarian: false,
        spicy: false
      })
      fetchData()
    } catch (error) {
      setMessage('Error adding menu item: ' + (error.response?.data?.message || error.message))
    }
  }

  const updateReservationStatus = async (id, status) => {
    try {
      await axios.put(`${apiUrl}/reservations/${id}`, { status }, { headers })
      fetchData()
      setMessage('Reservation updated successfully!')
    } catch (error) {
      setMessage('Error updating reservation: ' + (error.response?.data?.message || error.message))
    }
  }

  const updateOrderStatus = async (id, status) => {
    try {
      await axios.put(`${apiUrl}/orders/${id}/status`, { status }, { headers })
      fetchData()
      setMessage('Order updated successfully!')
    } catch (error) {
      setMessage('Error updating order: ' + (error.response?.data?.message || error.message))
    }
  }

  const deleteMenuItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${apiUrl}/menu/${id}`, { headers })
        setMessage('Menu item deleted successfully!')
        fetchData()
      } catch (error) {
        setMessage('Error deleting menu item: ' + (error.response?.data?.message || error.message))
      }
    }
  }

  const buildWhatsAppUrl = (phone, text) => {
    const digits = (phone || '').replace(/[^\d]/g, '')
    const encoded = encodeURIComponent(text)
    if (digits) return `https://wa.me/${digits}?text=${encoded}`
    return `https://wa.me/?text=${encoded}`
  }

  const sendDashboardToWhatsApp = async () => {
    setSendingWhatsApp(true)
    setMessage('')
    try {
      const response = await axios.get(`${apiUrl}/admin/dashboard-summary`, { headers })
      const text = response.data?.text || ''
      if (!text) {
        setMessage('Error: Dashboard summary is empty')
        return
      }

      const defaultPhone = import.meta?.env?.VITE_WHATSAPP_NUMBER || ''
      const phone = defaultPhone || window.prompt('Enter WhatsApp number (with country code, e.g. 919999999999). Leave blank to just open WhatsApp with the text.', '')

      const url = buildWhatsAppUrl(phone, text)
      window.open(url, '_blank', 'noopener,noreferrer')
      setMessage('Dashboard summary opened in WhatsApp')
    } catch (error) {
      console.error('Error sending WhatsApp summary:', error)
      setMessage('Error sending WhatsApp summary: ' + (error.response?.data?.message || error.message))
    } finally {
      setSendingWhatsApp(false)
    }
  }

  return (
    <div>
      <section className="hero" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <h1>Admin Dashboard</h1>
        <p>Manage your cafe operations</p>
      </section>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
          <button onClick={sendDashboardToWhatsApp} disabled={sendingWhatsApp}>
            {sendingWhatsApp ? 'Preparing WhatsApp...' : 'Send dashboard to WhatsApp'}
          </button>
        </div>

        {message && (
          <div style={{
            background: message.includes('Error') ? '#f8d7da' : '#d4edda',
            color: message.includes('Error') ? '#721c24' : '#155724',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{message}</span>
            <button onClick={() => setMessage('')} style={{ background: 'none', border: 'none', color: 'inherit', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '2px solid #ddd', overflowX: 'auto', flexWrap: 'wrap' }}>
          {['reservations', 'orders', 'menu'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? '#1e40af' : '#3b82f6',
                borderRadius: '0',
                color: 'white',
                padding: '1rem 2rem',
                border: 'none',
                cursor: 'pointer',
                borderBottom: activeTab === tab ? '3px solid white' : 'none'
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ fontSize: '1.1rem', color: '#666' }}>Loading...</p>
          </div>
        ) : (
          <>
            {activeTab === 'reservations' && (
              <div>
                <h2>Reservations ({reservations.length})</h2>
                {reservations.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>No reservations yet</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                      <thead>
                        <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                          <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
                          <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                          <th style={{ padding: '1rem', textAlign: 'left' }}>Date & Time</th>
                          <th style={{ padding: '1rem', textAlign: 'left' }}>Guests</th>
                          <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                          <th style={{ padding: '1rem', textAlign: 'left' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.map(res => (
                          <tr key={res._id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '1rem' }}>{res.name}</td>
                            <td style={{ padding: '1rem' }}>{res.email}</td>
                            <td style={{ padding: '1rem' }}>
                              {new Date(res.date).toLocaleDateString()} {res.time}
                            </td>
                            <td style={{ padding: '1rem' }}>{res.guests}</td>
                            <td style={{ padding: '1rem' }}>
                              <span className={`badge badge-${res.status}`}>
                                {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                              </span>
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <select 
                                onChange={(e) => updateReservationStatus(res._id, e.target.value)} 
                                value={res.status}
                                style={{ padding: '0.5rem' }}
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2>Orders ({orders.length})</h2>
                {orders.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>No orders yet</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                      <thead>
                        <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
                          <th style={{ padding: '1rem', textAlign: 'left' }}>Customer</th>
                          <th style={{ padding: '1rem', textAlign: 'left' }}>Items</th>
                          <th style={{ padding: '1rem', textAlign: 'left' }}>Total (₹)</th>
                          <th style={{ padding: '1rem', textAlign: 'left' }}>Type</th>
                          <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                          <th style={{ padding: '1rem', textAlign: 'left' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '1rem' }}>{order.customerName}</td>
                            <td style={{ padding: '1rem' }}>{order.items.length} items</td>
                            <td style={{ padding: '1rem' }}>₹{order.totalAmount.toFixed(2)}</td>
                            <td style={{ padding: '1rem', textTransform: 'capitalize' }}>{order.orderType}</td>
                            <td style={{ padding: '1rem' }}>
                              <span className={`badge badge-${order.status}`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <select 
                                onChange={(e) => updateOrderStatus(order._id, e.target.value)} 
                                value={order.status}
                                style={{ padding: '0.5rem' }}
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="preparing">Preparing</option>
                                <option value="ready">Ready</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'menu' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <h2>Menu Items ({menuItems.length})</h2>
                  <button onClick={() => setShowAddMenuItem(!showAddMenuItem)}>
                    {showAddMenuItem ? '✕ Cancel' : '+ Add Item'}
                  </button>
                </div>

                {showAddMenuItem && (
                  <div className="card" style={{ marginBottom: '2rem' }}>
                    <h3>Add New Menu Item</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                      <input
                        type="text"
                        placeholder="Item Name *"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Description *"
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      />
                      <input
                        type="number"
                        placeholder="Price *"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || '' })}
                        step="0.01"
                      />
                      <select
                        value={newItem.category}
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                      >
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="desserts">Desserts</option>
                        <option value="beverages">Beverages</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="radio"
                          name="vegType"
                          checked={newItem.vegetarian === true}
                          onChange={() => setNewItem({ ...newItem, vegetarian: true })}
                        />
                        Vegetarian
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="radio"
                          name="vegType"
                          checked={newItem.vegetarian === false}
                          onChange={() => setNewItem({ ...newItem, vegetarian: false })}
                        />
                        Non-Vegetarian
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={newItem.spicy}
                          onChange={(e) => setNewItem({ ...newItem, spicy: e.target.checked })}
                        />
                        Spicy
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={newItem.available}
                          onChange={(e) => setNewItem({ ...newItem, available: e.target.checked })}
                        />
                        Available
                      </label>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button onClick={addMenuItem}>Add Item</button>
                      <button onClick={() => setShowAddMenuItem(false)} style={{ background: '#999' }}>Cancel</button>
                    </div>
                  </div>
                )}

                {menuItems.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>No menu items yet. Add one to get started!</p>
                ) : (
                  <div className="grid">
                    {menuItems.map(item => (
                      <div key={item._id} className="card">
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1rem' }} />
                        <h4>{item.name}</h4>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>{item.description}</p>
                        <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem' }}>
                          ₹{item.price.toFixed(2)}
                        </p>
                        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
                          Category: {item.category} | {item.available ? '✓ Available' : '✗ Unavailable'} | {item.vegetarian ? '🥗 Vegetarian' : '🍗 Non-Vegetarian'}
                        </p>
                        <button
                          onClick={() => deleteMenuItem(item._id)}
                          style={{ width: '100%', background: '#dc3545' }}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
