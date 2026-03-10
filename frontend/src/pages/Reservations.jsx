import { useState } from 'react'
import axios from 'axios'

function Reservations({ apiUrl }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 1,
    date: '',
    time: '',
    specialRequests: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Validation
    if (!form.name || !form.email || !form.phone || !form.date || !form.time) {
      setError('Please fill in all required fields')
      return
    }

    try {
      await axios.post(`${apiUrl}/reservations`, form)
      setSubmitted(true)
      setForm({
        name: '',
        email: '',
        phone: '',
        guests: 1,
        date: '',
        time: '',
        specialRequests: ''
      })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      setError('Error creating reservation. Please try again.')
    }
  }

  return (
    <div>
      <section className="hero" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <h1>Make a Reservation</h1>
        <p>Reserve your table and enjoy a wonderful dining experience</p>
      </section>

      <div className="container">
        {submitted && (
          <div style={{ background: '#d4edda', border: '1px solid #c3e6cb', color: '#155724', padding: '1rem', borderRadius: '4px', marginTop: '2rem', textAlign: 'center' }}>
            ✅ Reservation submitted successfully! We'll confirm within 2 hours.
          </div>
        )}

        {error && (
          <div style={{ background: '#f8d7da', border: '1px solid #f5c6cb', color: '#721c24', padding: '1rem', borderRadius: '4px', marginTop: '2rem' }}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label>Number of Guests *</label>
              <input
                type="number"
                name="guests"
                value={form.guests}
                onChange={handleChange}
                min="1"
                max="20"
                required
              />
            </div>

            <div>
              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label>Time *</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Special Requests or Dietary Requirements</label>
            <textarea
              name="specialRequests"
              value={form.specialRequests}
              onChange={handleChange}
              rows="4"
              placeholder="Let us know if you have any special requests..."
            ></textarea>
          </div>

          <button type="submit" style={{ width: '100%' }}>Reserve Table</button>
        </form>
      </div>
    </div>
  )
}

export default Reservations
