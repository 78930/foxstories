# Fox Stories Cafe - MERN Website

A complete full-stack website for Fox Stories Cafe with menu management, online reservations, and order management system.

## 🚀 Features

✅ **Homepage** - Beautiful landing page with cafe information
✅ **Menu Display** - Browse cafe menu with filters by category
✅ **Online Reservations** - Book tables with date/time selection
✅ **Online Ordering** - Order items for delivery or pickup
✅ **Admin Dashboard** - Manage reservations, orders, and menu items
✅ **Admin Authentication** - Secure login system for administrators
✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## 📋 Tech Stack

- **Frontend**: React 18 + Vite + React Router
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Pure CSS3

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/foxstories
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

4. Create initial admin user (run once):
```bash
curl -X POST http://localhost:5000/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@foxstories.com","password":"Admin@123"}'
```

5. Start backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📚 API Documentation

### Menu Endpoints

- **GET** `/api/menu` - Get all menu items
- **GET** `/api/menu/category/:category` - Get items by category
- **GET** `/api/menu/:id` - Get single menu item
- **POST** `/api/menu` - Create menu item (Admin)
- **PUT** `/api/menu/:id` - Update menu item (Admin)
- **DELETE** `/api/menu/:id` - Delete menu item (Admin)

### Reservation Endpoints

- **POST** `/api/reservations` - Create reservation
- **GET** `/api/reservations/:id` - Get single reservation
- **GET** `/api/reservations` - Get all reservations (Admin)
- **PUT** `/api/reservations/:id` - Update reservation (Admin)
- **DELETE** `/api/reservations/:id` - Cancel reservation (Admin)

### Order Endpoints

- **POST** `/api/orders` - Create order
- **GET** `/api/orders/:id` - Get single order
- **GET** `/api/orders` - Get all orders (Admin)
- **PUT** `/api/orders/:id/status` - Update order status (Admin)
- **DELETE** `/api/orders/:id` - Cancel order (Admin)

### Admin Endpoints

- **POST** `/api/admin/login` - Admin login
- **POST** `/api/admin/create` - Create admin account (first setup only)

## 🔐 Admin Dashboard

Access the admin dashboard at `/admin-login`

### Default Credentials (after setup)
- Email: `admin@foxstories.com`
- Password: `Admin@123`

### Admin Features
- View and manage reservations
- View and manage orders
- Add/edit/delete menu items
- Update order and reservation statuses

## 📂 Project Structure

```
foxstories-mern/
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── config/
│   │   ├── models/
│   │   │   ├── MenuItem.js
│   │   │   ├── Reservation.js
│   │   │   ├── Order.js
│   │   │   └── Admin.js
│   │   ├── controllers/
│   │   │   ├── menuController.js
│   │   │   ├── reservationController.js
│   │   │   ├── orderController.js
│   │   │   └── adminController.js
│   │   ├── routes/
│   │   │   ├── menuRoutes.js
│   │   │   ├── reservationRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   └── adminRoutes.js
│   │   └── middleware/
│   │       └── auth.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── index.css
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Menu.jsx
    │   │   ├── Reservations.jsx
    │   │   ├── Orders.jsx
    │   │   ├── AdminLogin.jsx
    │   │   └── AdminDashboard.jsx
    │   └── components/ (optional)
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🎨 Menu Categories

- Breakfast
- Lunch
- Dinner
- Desserts
- Beverages

## 📦 Deployment

### Backend (Using Render)

1. Push your code to GitHub (or another Git provider supported by Render).
2. In the Render dashboard, create a **New Web Service** and connect this repository.
3. Set the **Root Directory** to `backend`, then configure:
   - Build Command: `npm install`
   - Start Command: `npm run dev` (or your production start script)
4. In the **Environment** section, add:
   - `MONGODB_URI=your_mongodb_url`
   - `JWT_SECRET=your_secret_key`
5. Click **Create Web Service** to deploy; Render will give you a backend URL to use as your `API_URL`.

### Frontend (Using Vercel)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Update API URL in frontend to point to deployed backend

## 🔄 Workflow

### For Customers

1. **Browse Menu** → View all available items organized by category
2. **Make Reservation** → Book a table with date/time preferences
3. **Order Online** → Add items to cart and place delivery/pickup order
4. **Track Status** → View reservation and order status

### For Admin

1. **Login** → Access admin dashboard with authentication
2. **Manage Reservations** → Confirm or cancel reservations
3. **Manage Orders** → Update order status (pending→confirmed→preparing→ready→delivered)
4. **Manage Menu** → Add, edit, or delete menu items

## 🐛 Troubleshooting

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check CORS configuration in backend
- Verify API_URL in frontend matches backend URL

### MongoDB connection error
- Ensure MongoDB is running
- Check connection string in .env
- Verify network access if using MongoDB Atlas

### Admin login not working
- Ensure admin user is created via setup endpoint
- Check JWT_SECRET in .env matches
- Verify email and password are correct

## 📞 Support

For issues or questions, please check:
- Backend console for server errors
- Browser console for frontend errors
- MongoDB connection status

## 📄 License

© 2024 Fox Stories Cafe. All rights reserved.

## 🚀 Next Steps

1. Connect to MongoDB (local or Atlas)
2. Install dependencies for both backend and frontend
3. Run backend and frontend servers
4. Create admin account via setup endpoint
5. Access admin dashboard to add menu items
6. Test the full workflow

Happy coding! 🦊☕
