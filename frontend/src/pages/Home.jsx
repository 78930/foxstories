import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Welcome to Fox Stories Cafe</h1>
        <p>Where every cup tells a story</p>
        <Link to="/menu"><button>View Menu</button></Link>
      </section>

      <section className="container" style={{ padding: '4rem 1rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem' }}>Why Choose Us?</h2>
        <div className="grid">
          <div className="card">
            <h3>🎨 Cozy Ambiance</h3>
            <p>Relax in our warm, welcoming atmosphere designed for conversation and creativity.</p>
          </div>
          <div className="card">
            <h3>☕ Premium Coffee</h3>
            <p>Sourced from the finest sources around the world, expertly brewed to perfection.</p>
          </div>
          <div className="card">
            <h3>🍰 Homemade Pastries</h3>
            <p>Fresh baked daily by our skilled pastry chefs using quality ingredients.</p>
          </div>
          <div className="card">
            <h3>📅 Easy Reservations</h3>
            <p>Book your table online in seconds for a hassle-free dining experience.</p>
          </div>
          <div className="card">
            <h3>🚚 Fast Delivery</h3>
            <p>Order online and we'll deliver your favorite items right to your doorstep.</p>
          </div>
          <div className="card">
            <h3>❤️ Community Focused</h3>
            <p>Supporting local artists and creators with our unique space.</p>
          </div>
        </div>
      </section>

      <section style={{ background: '#f9f9f9', padding: '4rem 1rem', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ marginBottom: '2rem' }}>Ready to Visit Us?</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            Make a reservation, explore our menu, or place an order for delivery!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/menu"><button>Browse Menu</button></Link>
            <Link to="/reservations"><button>Make Reservation</button></Link>
            <Link to="/orders"><button>Order Online</button></Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
