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
cd backend
npm run seed:admin
```

You should see output like:
```
✓ MongoDB connected
✓ Admin created successfully!
  Email: admin@foxstories.com
  Password: Admin@123
```

**Alternative (using curl):**
```bash
curl -X POST http://localhost:5000/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@foxstories.com","password":"Admin@123"}'
```

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

**Complete the Pre-Deployment Checklist before pushing to production:**

→ See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for detailed security and testing steps

Key checklist items:
- [ ] Change JWT_SECRET in backend/.env (run: `npm run gen:secret`)
- [ ] Update admin password (see [PASSWORD_MANAGEMENT.md](PASSWORD_MANAGEMENT.md))
- [ ] Add all menu items via admin dashboard
- [ ] Test all features thoroughly
- [ ] Set up MongoDB Atlas (or ensure MongoDB is running)
- [ ] Configure CORS for your frontend domain

## � Documentation

| Document | Purpose |
|----------|---------|
| [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) | ✅ Complete pre-deployment security checklist (REQUIRED) |
| [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) | 🚀 Step-by-step guide to deploy on Render |
| [PASSWORD_MANAGEMENT.md](PASSWORD_MANAGEMENT.md) | 🔐 How to change admin password + security best practices |
| [STATUS.md](STATUS.md) | 📊 Current system status and what's working |

## 🔧 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/foxstories
PORT=5000
JWT_SECRET=generate_with_npm_run_gen_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**To generate a secure JWT_SECRET:**
```bash
cd backend
npm run gen:secret
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=918885653460
```

See [backend/.env.example](backend/.env.example) for all available options.

## 🔐 Security Notes

- **NEVER** commit `.env` files to GitHub (they're in `.gitignore`)
- Each environment (local, staging, production) needs its own `.env` file
- Change default admin password immediately after first login
- Generate a new JWT_SECRET before production deployment
- Update CORS configuration for your production domain

See [PASSWORD_MANAGEMENT.md](PASSWORD_MANAGEMENT.md) for detailed password management.

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

**Issue**: "Admin login fails with 'Invalid credentials'"
- Solution 1: Ensure you ran `npm run seed:admin`
- Solution 2: See [PASSWORD_MANAGEMENT.md](PASSWORD_MANAGEMENT.md) to reset password

**Issue**: "Cannot add menu items"
- Solution: Get JWT token from login, use it in Authorization header
- See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) Phase 3 for testing

**Issue**: "CORS errors in browser console"
- Solution: Check that CORS is configured for your domain
- See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) Phase 5

## 📚 Next Steps

1. **First Time Setup:**
   - Complete all steps 1-6 above
   - Test homepage, menu, reservations, orders, and admin login
   - Change admin password: See [PASSWORD_MANAGEMENT.md](PASSWORD_MANAGEMENT.md)

2. **Before Production:**
   - Follow [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) (Required!)
   - Generate new JWT_SECRET: `cd backend && npm run gen:secret`
   - Populate menu items via admin dashboard

3. **Deploy to Production:**
   - See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for Render deployment steps
   - Monitor logs: See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) Phase 4

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

## 🚀 Ready to Deploy?

Follow this checklist before production:

1. ✅ Run `npm run gen:secret` and update JWT_SECRET
2. ✅ Change admin password (see PASSWORD_MANAGEMENT.md)
3. ✅ Run `npm run seed:menu` to populate items
4. ✅ Test all features locally
5. ✅ Complete DEPLOYMENT_CHECKLIST.md
6. ✅ Deploy using RENDER_DEPLOYMENT.md

Happy coding! 🦊☕
