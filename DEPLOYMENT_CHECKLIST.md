# 🚀 Pre-Deployment Checklist for Fox Stories Backend

**Use this checklist before pushing to GitHub and deploying to Render. Complete each step to ensure security, functionality, and production readiness.**

---

## ✅ Phase 1: Secure Secrets & Environment Variables

### 1.1 Generate New JWT_SECRET
**Status: [ ] Not Started [ ] In Progress [✓] Complete**

A strong JWT secret protects your authentication tokens. Generate a new 32-byte hex string:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Output example:** `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0`

### 1.2 Create/Update Backend .env File
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

Create `backend/.env` with your actual values:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/foxstories?retryWrites=true&w=majority

# JWT Secret (paste your generated secret from 1.1)
JWT_SECRET=YOUR_32_BYTE_HEX_SECRET_HERE

# Admin Setup (optional - for first-time deployment)
ADMIN_EMAIL=admin@foxstories.com
ADMIN_PASSWORD=ChangeMe@Secure123
```

**⚠️ IMPORTANT:**
- **NEVER** commit `.env` to GitHub
- `.env` is already in `.gitignore` — verify this
- Each environment (local, staging, production) needs its own values

### 1.3 Create Frontend .env File  
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=918885653460
```

For **production**, update the API URL:
```env
VITE_API_URL=https://foxstories-backend.onrender.com/api
VITE_WHATSAPP_NUMBER=918885653460
```

---

## ✅ Phase 2: Authentication & Password Security

### 2.1 Update Admin Password
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

After initial login (`admin@foxstories.com` / `Admin@123`), **IMMEDIATELY change the password**:

1. Log in to the Admin Dashboard: `http://localhost:3000/admin`
2. Look for "Account Settings" or "Change Password" section
3. Set a strong password (min 12 characters, mix of uppercase, numbers, symbols)
4. Example: `FoxStories@2024!Secure`

**Alternative: Using MongoDB directly**

If UI password change isn't available, use MongoDB Compass:

```javascript
// Copy/paste this in MongoDB Compass console
const bcrypt = require('bcryptjs');
const newPassword = 'YourNewSecurePassword123!';
const hashedPassword = bcrypt.hashSync(newPassword, 12);

// Then update the admin document:
db.admins.updateOne(
  { email: 'admin@foxstories.com' },
  { $set: { password: hashedPassword } }
);
```

### 2.2 Verify Token Authentication
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

Test JWT authentication with a valid token:

```bash
# 1. Get token from login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@foxstories.com","password":"Admin@123"}'

# 2. Copy the returned token value

# 3. Test protected endpoint with token
curl -X GET http://localhost:5000/api/admin/dashboard-summary \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Expected:** `200 OK` with dashboard data

---

## ✅ Phase 3: Feature Testing & Data Population

### 3.1 Seed Menu Items
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

Populate your database with sample menu items:

```bash
cd backend
npm run seed:menu
```

**Expected output:**
```
✓ MongoDB connected
Seeded 10 menu items.
```

### 3.2 Test All Features Locally
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

Run both backend and frontend in development mode:

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend  
cd frontend && npm run dev
```

Then test each feature:

| Feature | URL | Test |
|---------|-----|------|
| **Homepage** | http://localhost:3000 | Loads without errors ✓ |
| **Menu** | http://localhost:3000/menu | Items display + filters work ✓ |
| **Reservations** | http://localhost:3000/reservations | Can submit form ✓ |
| **Orders** | http://localhost:3000/orders | Can add to cart + checkout ✓ |
| **Admin Login** | http://localhost:3000/admin-login | Login with credentials ✓ |
| **Admin Dashboard** | http://localhost:3000/admin | View orders/reservations ✓ |
| **API Endpoints** | http://localhost:5000/api/health | Returns status ✓ |

### 3.3 Test Edge Cases
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

- [ ] Invalid login (wrong email/password) → shows "Invalid credentials"
- [ ] Expired JWT token (wait 24h or edit token) → shows 401 Unauthorized
- [ ] Missing required fields → shows validation error
- [ ] Empty menu → homepage shows "No items available"
- [ ] Empty reservations → admin shows "No reservations"
- [ ] Network offline → app shows error message gracefully

---

## ✅ Phase 4: Database & Infrastructure

### 4.1 Verify MongoDB Atlas Setup
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

- [ ] Database created on MongoDB Atlas (M0 free tier OK for testing)
- [ ] Database user created with strong password
- [ ] IP whitelist includes Render's IP (0.0.0.0/0 for now, restrict later)
- [ ] Test connection string format: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/foxstories?retryWrites=true`

**Verify connection:**

```bash
mongosh "mongodb+srv://USER:PASS@cluster0.xxxxx.mongodb.net/foxstories"
```

### 4.2 Test Database Backups
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

- [ ] MongoDB Atlas backups enabled (automatic snapshots)
- [ ] Know how to restore a backup if needed

---

## ✅ Phase 5: CORS & Security Configuration

### 5.1 Review CORS Settings
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

⚠️ **CRITICAL:** Your current `server.js` has `origin: '*'` which allows ANY website to access your API.

**Update `backend/src/server.js`:**

```javascript
// BEFORE (INSECURE)
app.use(cors({
  origin: '*',
  credentials: true
}));

// AFTER (SECURE)
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://your-frontend.onrender.com'
    : 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**Update your production frontend URL:**
- Find your frontend Render URL (looks like: `https://foxstories-frontend.onrender.com`)
- Replace `https://your-frontend.onrender.com` with actual URL

### 5.2 Add Security Headers
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

Add this after CORS setup in `server.js`:

```javascript
// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
```

---

## ✅ Phase 6: Production Build & Deployment

### 6.1 Run Production Build Locally
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

Test your production build before deploying:

```bash
# Frontend
cd frontend
npm run build

# Check that build folder created successfully
ls -la dist/
```

**Expected:** `dist/` folder with `index.html` and assets

### 6.2 Test Production Environment Locally
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

```bash
# Backend
cd backend
NODE_ENV=production npm start

# Should show: "✓ Server running on http://localhost:5000"
```

### 6.3 Git Commit & Push
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

```bash
# From project root
git status

# Should show:
# - backend/.env (NEW - DO NOT COMMIT - check .gitignore)
# - frontend/.env (NEW - DO NOT COMMIT - check .gitignore)
# - Modified files (seedAdmin.js, server.js, etc.)

# Verify .gitignore has .env
cat .gitignore | grep ".env"

# Stage changes
git add .

# Commit
git commit -m "Pre-deployment: secure JWT, update CORS, add seed scripts"

# Push
git push origin main
```

---

## ✅ Phase 7: Deploy to Render

### 7.1 Create/Update Backend on Render
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

1. Go to your Render backend dashboard
2. Navigate to **Environment** → **Edit Environment Variables**
3. Add/Update these variables:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/foxstories?retryWrites=true&w=majority
JWT_SECRET=your_32_byte_hex_here
```

4. Click **Save & Deploy**
5. Wait for deployment to complete (check logs)

### 7.2 Create/Update Frontend on Render
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

1. Go to your Render frontend dashboard
2. Navigate to **Environment** → **Edit Environment Variables**
3. Add/Update:

```
VITE_API_URL=https://your-backend.onrender.com/api
VITE_WHATSAPP_NUMBER=918885653460
```

4. Click **Save & Deploy**
5. Wait for frontend to build and deploy

### 7.3 Verify Deployed Backend
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

Test your live API:

```bash
# Health check
curl https://foxstories-backend.onrender.com/api/health

# Get menu items
curl https://foxstories-backend.onrender.com/api/menu

# Expected: 200 OK with JSON data
```

### 7.4 Verify Deployed Frontend
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

- [ ] Open https://foxstories-frontend.onrender.com
- [ ] Check browser console for errors (F12 → Console tab)
- [ ] Test homepage loads
- [ ] Click "Menu" — items load from live API ✓
- [ ] Check Network tab — API calls go to `foxstories-backend.onrender.com` ✓

### 7.5 Test Admin Login on Production
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

1. Go to `https://foxstories-frontend.onrender.com/admin-login`
2. Login with: `admin@foxstories.com` / `Admin@123`
3. Change password immediately
4. Test adding a reservation/order
5. Check admin dashboard loads

---

## ✅ Phase 8: Final Validation & Monitoring

### 8.1 Performance Check
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

- [ ] Frontend loads in < 3 seconds
- [ ] Menu API response in < 500ms
- [ ] Admin dashboard loads in < 2 seconds
- [ ] Images load properly

### 8.2 Security Checklist
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

- [ ] JWT_SECRET is strong (32+ bytes hex)
- [ ] Admin password changed from default
- [ ] CORS restricts to your frontend domain
- [ ] .env files in .gitignore (not in GitHub)
- [ ] MongoDB credentials are secure
- [ ] HTTPS enforced on frontend (Render default)

### 8.3 Monitor Live Deployment
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

**Backend Logs (Check for errors):**
```bash
# In Render dashboard:
# Backend → Logs → Watch for errors
# Expected: "✓ MongoDB connected successfully"
```

**Frontend Logs (Browser Console):**
```javascript
// Open https://foxstories.onrender.com
// Press F12 → Console
// Should be clean (no 401, 404, CORS errors)
```

### 8.4 Smoke Test Production
**Status: [ ] Not Started [ ] In Progress [ ] Complete**

- [ ] Homepage loads
- [ ] Menu displays items
- [ ] Admin login works
- [ ] Can create reservation
- [ ] Can create order
- [ ] Admin can view data
- [ ] No errors in browser console

---

## 🆘 Troubleshooting

### Issue: "Invalid credentials" on admin login
**Solution:** Run `npm run seed:admin` to recreate default admin

### Issue: CORS error in browser
**Solution:** Check CORS origin in `server.js` matches your frontend URL

### Issue: MongoDB connection error
**Solution:** 
- Verify MONGODB_URI in .env
- Check IP whitelist on MongoDB Atlas (0.0.0.0/0 for now)
- Test connection string: `mongosh "your_connection_string"`

### Issue: Menu items don't show
**Solution:** Run `npm run seed:menu` and verify items in MongoDB

### Issue: Frontend can't reach backend
**Solution:** 
- Check VITE_API_URL in frontend/.env
- Verify Render backend is running (check logs)
- Test API directly in browser: `https://backend-url/api/health`

---

## ✨ Ready for Production!

Once all sections are complete ✓, your Fox Stories app is ready for production users.

**Next Steps:**
1. Monitor logs daily for errors
2. Get user feedback
3. Plan Phase 2 features (payments, reviews, etc.)
4. Set up automated backups
5. Implement analytics

**Questions?** Check STATUS.md and QUICKSTART.md for additional context.
