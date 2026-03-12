# 🚀 Deploy Fox Stories to Render

Complete guide for deploying your MERN app to Render with security best practices.

## Prerequisites

- [ ] GitHub account with code pushed
- [ ] Render account (https://render.com) - free tier is fine
- [ ] MongoDB Atlas account with database created
- [ ] Generated JWT_SECRET (`npm run gen:secret`)

---

## Phase 1: Backend Deployment

### 1.1 Create Backend Service on Render

1. Log in to https://render.com
2. Click **New +** → **Web Service**
3. Click **Connect a repository** → Select your GitHub repo
4. Configure:

   | Field | Value |
   |-------|-------|
   | **Name** | `foxstories-backend` |
   | **Environment** | `Node` |
   | **Region** | `Virginia (US East)` |
   | **Branch** | `main` |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |

5. Click **Create Web Service**
6. Wait for initial deployment

### 1.2 Add Environment Variables

1. Go to backend service dashboard
2. Click **Environment** in left sidebar
3. Click **Add Environment Variable**
4. Add these variables:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/foxstories?retryWrites=true&w=majority
JWT_SECRET=YOUR_GENERATED_32_BYTE_HEX_SECRET
FRONTEND_URL=https://foxstories-frontend.onrender.com  (update later with actual frontend URL)
```

5. Click **Save & Deploy**
6. Wait for fresh deployment

### 1.3 Verify Backend is Running

Once deployed:

```bash
# Health check
curl https://foxstories-backend.onrender.com/api/health

# Expected response:
# {"status":"Server is running","timestamp":"2026-03-12T..."}

# Get menu (should return empty or seeded items)
curl https://foxstories-backend.onrender.com/api/menu
```

**Save your backend URL** - you'll need it for frontend configuration.

---

## Phase 2: Frontend Deployment

### 2.1 Create Frontend Service on Render

1. From Render dashboard, click **New +** → **Web Service**
2. Click **Connect a repository** → Select your GitHub repo
3. Configure:

   | Field | Value |
   |-------|-------|
   | **Name** | `foxstories-frontend` |
   | **Environment** | `Node` |
   | **Region** | `Virginia (US East)` |
   | **Branch** | `main` |
   | **Build Command** | `cd frontend && npm install && npm run build` |
   | **Start Command** | `npm run start --prefix frontend` |
   | **Auto-deploy** | Yes |

4. Click **Create Web Service**
5. Wait for initial deployment

### 2.2 Add Environment Variables

1. Go to frontend service dashboard
2. Click **Environment** in left sidebar
3. Click **Add Environment Variable**

Add:
```
VITE_API_URL=https://foxstories-backend.onrender.com/api
VITE_WHATSAPP_NUMBER=918885653460
```

4. Click **Save & Deploy**

### 2.3 Update Backend CORS

Now that you have frontend URL, update backend:

1. Go to backend service dashboard
2. Click **Environment** 
3. Edit the `FRONTEND_URL` variable:

```
FRONTEND_URL=https://foxstories-frontend.onrender.com
```

4. Click **Save & Deploy**

---

## Phase 3: Initialize Production Data

### 3.1 Seed Production Admin & Menu

Once backend is deployed and running:

```bash
# From your local machine, in backend directory
# Seed admin
curl -X POST https://foxstories-backend.onrender.com/api/admin/create \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@foxstories.com","password":"Admin@123"}'

# Expected: {"message":"Admin created successfully"}
```

### 3.2 Seed Menu Items

```bash
# Login to get token
TOKEN=$(curl -X POST https://foxstories-backend.onrender.com/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@foxstories.com","password":"Admin@123"}' \
  | jq -r '.token')

# Add menu item
curl -X POST https://foxstories-backend.onrender.com/api/menu \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name":"Espresso",
    "description":"Rich espresso shot",
    "price":3.50,
    "category":"beverages",
    "vegetarian":true,
    "spicy":false
  }'
```

---

## Phase 4: Post-Deployment Validation

### 4.1 Test Frontend

1. Open https://foxstories-frontend.onrender.com
2. Check browser console (F12 → Console) - should be clean
3. Test pages:
   - [ ] Homepage loads
   - [ ] Menu displays items
   - [ ] Can make reservation
   - [ ] Can create order
   - [ ] Admin login works

### 4.2 Test Admin Dashboard

1. Go to https://foxstories-frontend.onrender.com/admin-login
2. Login: `admin@foxstories.com` / `Admin@123`
3. Change admin password immediately!
4. Test features:
   - [ ] View reservations
   - [ ] View orders
   - [ ] Add menu item
   - [ ] Update statuses

### 4.3 Monitor Logs

**Backend logs** (check for MongoDB connection errors):
```
Settings → Logs → Backend service
```

**Frontend logs** (check for API errors):
```
Open site → F12 → Console tab
```

---

## Phase 5: Production Security Checklist

- [ ] JWT_SECRET is strong (32+ bytes)
- [ ] Admin password changed from default
- [ ] CORS restricts to your frontend domain
- [ ] .env files NOT in GitHub repo
- [ ] MongoDB Atlas IP whitelist set
- [ ] HTTPS enforced (Render default)
- [ ] Backups enabled (Atlas automatic)

---

## Common Issues & Solutions

### Issue: "MongoDB connection refused"
**Solution:** 
- Verify MONGODB_URI in Render environment
- Add Render's IP to MongoDB Atlas whitelist (0.0.0.0/0 temporarily)
- Test connection: `mongosh "your_connection_string"`

### Issue: "CORS error in frontend"
**Solution:**
- Verify FRONTEND_URL in backend environment
- Check frontend VITE_API_URL points to backend
- Restart both services after updating

### Issue: "Menu items don't show"
**Solution:**
- Verify seed:menu was run
- Check MongoDB has items: `db.menuitems.find()`
- Check browser network tab for API errors

### Issue: "Admin login fails"
**Solution:**
- Verify seed:admin or create endpoint was called
- Reset admin: `curl -X POST .../api/admin/create`
- Check JWT_SECRET is set in backend environment

### Issue: Frontend shows "Cannot GET /"
**Solution:**
- Check frontend build command: `cd frontend && npm install && npm run build`
- Verify frontend dist/ folder created locally
- Restart frontend service

---

## Troubleshooting Render Deployment

### View Logs
```
Dashboard → Service → Logs → Watch in real-time
```

### Force Redeploy
```
Dashboard → Service → Manual Deploy → Deploy
```

### Clear Service
```
Dashboard → Settings → Danger Zone → Delete Service
Then recreate with fresh configuration
```

---

## Next Steps

1. **Monitor Daily:**
   - Check error logs
   - Test key features
   - Monitor performance

2. **Improve:**
   - Add user authentication
   - Enable payment processing
   - Set up email notifications
   - Add analytics

3. **Scale:**
   - Move to paid Render tier
   - Set up CDN for images
   - Implement caching
   - Add automated backups

---

## Support

- **Render Docs:** https://render.com/docs
- **MongoDB Atlas:** https://www.mongodb.com/docs/atlas
- **Express.js:** https://expressjs.com
- **React:** https://react.dev

Happy deploying! 🦊🚀
