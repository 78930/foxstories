# Quick Start Guide for Fox Stories Cafe

## 🚀 Get Up and Running in 5 Minutes

### Step 1: Backend Setup (Terminal 1)
```bash
cd backend
npm install
npm run dev
```

Wait for message: "Server running on http://localhost:5000"

### Step 2: Create Admin Account (Terminal 2)
```bash
curl -X POST http://localhost:5000/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@foxstories.com","password":"Admin@123"}'
```

You should see: `"Admin created successfully"`

### Step 3: Add Sample Menu Items (Make POST request)
Use Postman or curl to add menu items:
```bash
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name":"Espresso",
    "description":"Rich, concentrated coffee shot",
    "price":3.50,
    "category":"beverages",
    "vegetarian":true,
    "spicy":false
  }'
```

### Step 4: Frontend Setup (Terminal 3)
```bash
cd frontend
npm install
npm run dev
```

Wait for message: "Local: http://localhost:3000"

### Step 5: Access the Website
- **Homepage**: http://localhost:3000
- **Menu**: http://localhost:3000/menu
- **Reservations**: http://localhost:3000/reservations
- **Orders**: http://localhost:3000/orders
- **Admin Login**: http://localhost:3000/admin-login

### Step 6: Login to Admin Dashboard
- Email: `admin@foxstories.com`
- Password: `Admin@123`
- Dashboard URL: http://localhost:3000/admin

## 📋 Before Deployment

- [ ] Change JWT_SECRET in backend/.env
- [ ] Update admin password
- [ ] Add all menu items via admin dashboard
- [ ] Test all features thoroughly
- [ ] Set up MongoDB Atlas (or ensure MongoDB is running)
- [ ] Configure CORS if needed

## 🔧 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/foxstories
PORT=5000
JWT_SECRET=change_this_to_random_string
NODE_ENV=development
```

### Frontend
API URL is hardcoded in src/App.jsx:
```javascript
const API_URL = 'http://localhost:5000/api'
```
Change this when deploying to production.

WhatsApp number for the Admin Dashboard "Send dashboard to WhatsApp" button:
- Create `frontend/.env` (or edit it) and set:
```
VITE_WHATSAPP_NUMBER=918885653460
```
Use country code, digits only (no `+` or spaces).

## 📱 Key Features to Test

1. **Homepage** - View welcome and intro
2. **Menu Display** - Filter by category
3. **Make Reservation** - Book a table
4. **Order Online** - Add items and checkout
5. **Admin Dashboard** - Manage content
6. **Admin Features**:
   - View reservations and orders
   - Update reservation status
   - Update order status
   - Add/edit/delete menu items

## 🐛 Common Issues & Solutions

**Issue**: "Cannot connect to localhost:5000"
- Solution: Make sure backend is running with `npm run dev`

**Issue**: "MongoDB connection error"
- Solution: Install MongoDB locally or use MongoDB Atlas

**Issue**: "Admin login fails"
- Solution: Ensure you ran the admin creation curl command

**Issue**: "Cannot add menu items"
- Solution: Get JWT token from login, use it in Authorization header

## 📚 Next Steps

1. Customize the cafe name, logo, and colors
2. Add more menu items
3. Set up email notifications
4. Integrate payment gateway
5. Add user accounts for customers
6. Implement ratings and reviews
7. Deploy to production

Happy coding! 🦊☕
