import { useState, useEffect } from 'react'
import axios from 'axios'

function Orders({ apiUrl }) {
  const [menuItems, setMenuItems] = useState([])
  const [cart, setCart] = useState([])
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: '',
    orderType: 'delivery',
    notes: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`${apiUrl}/menu`)
      setMenuItems(response.data)
    } catch (error) {
      console.error('Error fetching menu:', error)
    }
  }

  const addToCart = (item) => {
    const existingItem = cart.find(c => c.menuItemId === item._id)
    if (existingItem) {
      setCart(cart.map(c => 
        c.menuItemId === item._id 
          ? { ...c, quantity: c.quantity + 1 }
          : c
      ))
    } else {
      setCart([...cart, {
        menuItemId: item._id,
        name: item.name,
        price: item.price,
        quantity: 1
      }])
    }
  }

  const removeFromCart = (itemId) => {
    setCart(cart.filter(c => c.menuItemId !== itemId))
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      setCart(cart.map(c =>
        c.menuItemId === itemId ? { ...c, quantity } : c
      ))
    }
  }

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (cart.length === 0) {
      setError('Please add items to your order')
      return
    }

    if (!form.customerName || !form.customerEmail || !form.customerPhone || !form.deliveryAddress) {
      setError('Please fill in all required fields')
      return
    }

    try {
      await axios.post(`${apiUrl}/orders`, {
        ...form,
        items: cart,
        totalAmount
      })
      setSubmitted(true)
      setCart([])
      setForm({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        deliveryAddress: '',
        orderType: 'delivery',
        notes: ''
      })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      setError('Error placing order. Please try again.')
    }
  }

  return (
    <div>
      <section className="hero" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <h1>Order Online</h1>
        <p>Browse our menu and place your order for delivery or pickup</p>
      </section>

      <div className="container" style={{ padding: '2rem 1rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div>
          <h2>Select Items</h2>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
            {menuItems.map(item => (
              <div key={item._id} className="card">
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '0.5rem' }} />
                <h4>{item.name}</h4>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>{item.description}</p>
                <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem' }}>
                  ₹{item.price.toFixed(2)}
                </p>
                <button onClick={() => addToCart(item)} style={{ width: '100%' }}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="card" style={{ position: 'sticky', top: '100px' }}>
            <h2>Your Order</h2>
            <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1rem' }}>
              {cart.length === 0 ? (
                <p style={{ color: '#999', textAlign: 'center', padding: '2rem' }}>Your cart is empty</p>
              ) : (
                cart.map(item => (
                  <div key={item.menuItemId} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '0.8rem',
                    borderBottom: '1px solid #eee'
                  }}>
                    <div>
                      <p style={{ fontWeight: 'bold' }}>{item.name}</p>
                      <p style={{ fontSize: '0.9rem', color: '#666' }}>₹{item.price.toFixed(2)}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <button onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)} style={{ padding: '0.3rem 0.6rem' }}>-</button>
                      <input 
                        type="number" 
                        value={item.quantity} 
                        onChange={(e) => updateQuantity(item.menuItemId, parseInt(e.target.value))}
                        style={{ width: '40px', textAlign: 'center' }}
                      />
                      <button onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)} style={{ padding: '0.3rem 0.6rem' }}>+</button>
                      <button onClick={() => removeFromCart(item.menuItemId)} style={{ padding: '0.3rem 0.6rem', background: '#dc3545' }}>×</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <>
                <div style={{ borderTop: '2px solid #ddd', paddingTop: '1rem', marginBottom: '1rem' }}>
                  <p style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    <span>Total:</span>
                    <span style={{ color: '#3b82f6' }}>₹{totalAmount.toFixed(2)}</span>
                  </p>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: 0, boxShadow: 'none', background: 'transparent', marginTop: '1rem' }}>
                  {error && (
                    <div style={{ background: '#f8d7da', color: '#721c24', padding: '0.5rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                      {error}
                    </div>
                  )}

                  {submitted && (
                    <div style={{ background: '#d4edda', color: '#155724', padding: '0.5rem', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem' }}>
                      ✅ Order placed successfully!
                    </div>
                  )}

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.9rem' }}>Name *</label>
                    <input
                      type="text"
                      name="customerName"
                      value={form.customerName}
                      onChange={handleChange}
                      required
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.9rem' }}>Email *</label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={form.customerEmail}
                      onChange={handleChange}
                      required
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.9rem' }}>Phone *</label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={form.customerPhone}
                      onChange={handleChange}
                      required
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.9rem' }}>Order Type *</label>
                    <select
                      name="orderType"
                      value={form.orderType}
                      onChange={handleChange}
                      style={{ width: '100%' }}
                    >
                      <option value="delivery">Delivery</option>
                      <option value="pickup">Pickup</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.9rem' }}>Address *</label>
                    <input
                      type="text"
                      name="deliveryAddress"
                      value={form.deliveryAddress}
                      onChange={handleChange}
                      required
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.9rem' }}>Special Notes</label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows="3"
                      style={{ width: '100%' }}
                    ></textarea>
                  </div>

                  <button type="submit" style={{ width: '100%' }}>Place Order</button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
