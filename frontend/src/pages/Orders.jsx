import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'

function Orders({ apiUrl }) {
  const [menuItems, setMenuItems] = useState([])
  const [cart, setCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
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
    } catch (err) {
      console.error('Error fetching menu:', err)
    }
  }

  const filteredMenuItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()

    if (!term) return menuItems

    return menuItems.filter((item) => {
      const name = item.name?.toLowerCase() || ''
      const description = item.description?.toLowerCase() || ''
      const category = item.category?.toLowerCase() || ''

      return (
        name.includes(term) ||
        description.includes(term) ||
        category.includes(term)
      )
    })
  }, [menuItems, searchTerm])

  const addToCart = (item) => {
    const existingItem = cart.find((c) => c.menuItemId === item._id)

    if (existingItem) {
      setCart(
        cart.map((c) =>
          c.menuItemId === item._id
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      )
    } else {
      setCart([
        ...cart,
        {
          menuItemId: item._id,
          name: item.name,
          price: item.price,
          quantity: 1
        }
      ])
    }
  }

  const removeFromCart = (itemId) => {
    setCart(cart.filter((c) => c.menuItemId !== itemId))
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      setCart(
        cart.map((c) =>
          c.menuItemId === itemId ? { ...c, quantity } : c
        )
      )
    }
  }

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (cart.length === 0) {
      setError('Please add items to your order')
      return
    }

    if (
      !form.customerName ||
      !form.customerEmail ||
      !form.customerPhone ||
      !form.deliveryAddress
    ) {
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
    } catch (err) {
      setError('Error placing order. Please try again.')
    }
  }

  return (
    <div className="page-container" style={{ padding: '2rem' }}>
      <h1>Order Online</h1>
      <p>Browse our menu and place your order for delivery or pickup</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '2rem',
          alignItems: 'start',
          marginTop: '2rem'
        }}
      >
        {/* LEFT SIDE */}
        <section>
          <h2>Select Items</h2>

          <input
            type="text"
            placeholder="Search item by name, category, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '420px',
              padding: '0.8rem 1rem',
              margin: '1rem 0 1.5rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '1rem'
            }}
          />

          {filteredMenuItems.length === 0 ? (
            <p>No items found.</p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem'
              }}
            >
              {filteredMenuItems.map((item) => (
                <div
                  key={item._id}
                  style={{
                    border: '1px solid #e5e5e5',
                    borderRadius: '10px',
                    padding: '1rem',
                    background: '#fff'
                  }}
                >
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <p style={{ fontWeight: 'bold' }}>
                    ₹{Number(item.price).toFixed(2)}
                  </p>
                  <button
                    onClick={() => addToCart(item)}
                    style={{
                      width: '100%',
                      padding: '0.7rem',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* RIGHT SIDE */}
        <section
          style={{
            background: '#fff',
            border: '1px solid #e5e5e5',
            borderRadius: '12px',
            padding: '1.25rem',
            position: 'sticky',
            top: '100px'
          }}
        >
          <h2>Your Order</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.menuItemId}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.8rem 0',
                    borderBottom: '1px solid #eee'
                  }}
                >
                  <div>
                    <strong>{item.name}</strong>
                    <p>₹{Number(item.price).toFixed(2)}</p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                      style={{ padding: '0.3rem 0.6rem' }}
                    >
                      -
                    </button>

                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.menuItemId, parseInt(e.target.value) || 1)
                      }
                      style={{ width: '50px', textAlign: 'center' }}
                    />

                    <button
                      onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                      style={{ padding: '0.3rem 0.6rem' }}
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.menuItemId)}
                      style={{
                        padding: '0.3rem 0.6rem',
                        background: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px'
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}

              <h3 style={{ marginTop: '1rem' }}>
                Total: ₹{totalAmount.toFixed(2)}
              </h3>

              {error && (
                <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>
              )}

              {submitted && (
                <p style={{ color: 'green', marginTop: '1rem' }}>
                  Order placed successfully!
                </p>
              )}

              <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                <input
                  type="text"
                  name="customerName"
                  placeholder="Name *"
                  value={form.customerName}
                  onChange={handleChange}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.8rem',
                    marginBottom: '1rem'
                  }}
                />

                <input
                  type="email"
                  name="customerEmail"
                  placeholder="Email *"
                  value={form.customerEmail}
                  onChange={handleChange}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.8rem',
                    marginBottom: '1rem'
                  }}
                />

                <input
                  type="text"
                  name="customerPhone"
                  placeholder="Phone *"
                  value={form.customerPhone}
                  onChange={handleChange}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.8rem',
                    marginBottom: '1rem'
                  }}
                />

                <select
                  name="orderType"
                  value={form.orderType}
                  onChange={handleChange}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.8rem',
                    marginBottom: '1rem'
                  }}
                >
                  <option value="delivery">Delivery</option>
                  <option value="pickup">Pickup</option>
                </select>

                <textarea
                  name="deliveryAddress"
                  placeholder="Address *"
                  value={form.deliveryAddress}
                  onChange={handleChange}
                  rows="3"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.8rem',
                    marginBottom: '1rem'
                  }}
                />

                <textarea
                  name="notes"
                  placeholder="Special Notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows="3"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.8rem',
                    marginBottom: '1rem'
                  }}
                />

                <button
                  type="submit"
                  style={{
                    padding: '0.9rem 1.4rem',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Place Order
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </div>
  )
}

export default Orders