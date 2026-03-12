# 🦊 Fox Stories Deployment Quick Reference Card

**Print this page or bookmark for quick access during deployment**

---

## 🚀 5-Minute Quick Start

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Seed data (one-time)
cd backend
npm run seed:admin
npm run seed:menu

# Terminal 3: Frontend
cd frontend
npm run dev
```

**Website:** http://localhost:3000  
**Admin:** http://localhost:3000/admin-login  
**API:** http://localhost:5000/api

---

## 🔐 Credentials

| Use | Email | Password |
|-----|-------|----------|
| **Development** | admin@foxstories.com | Admin@123 |
| **Production** | admin@foxstories.com | ⚠️ CHANGE THIS! |

⚠️ **IMPORTANT:** Change password before production! See PASSWORD_MANAGEMENT.md

---

## 🔑 GenSecret (Required for Production)

```bash
cd backend
npm run gen:secret
```

Copy the output and add to your backend `.env` and Render dashboard.

---

## 📊 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_generated_secret_from_npm_run_gen_secret
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=918885653460
```

---

## 🧪 Quick Tests

```bash
# Health Check
curl http://localhost:5000/api/health

# Get Menu
curl http://localhost:5000/api/menu

# Admin Login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@foxstories.com","password":"Admin@123"}'
```

---

## 📚 Main Documentation Files

| File | Use Case |
|------|----------|
| **DEPLOYMENT_READY.md** | 📖 Start here - overview |
| **DEPLOYMENT_CHECKLIST.md** | ✅ Phase-by-phase guide |
| **RENDER_DEPLOYMENT.md** | 🚀 Deploy to Render |
| **PASSWORD_MANAGEMENT.md** | 🔐 Change admin password |
| **QUICKSTART.md** | 🏃 Quick setup |

---

## 🎯 Pre-Deployment Checklist

- [ ] `npm run gen:secret` (generate new JWT_SECRET)
- [ ] Update backend/.env with new JWT_SECRET
- [ ] Change admin password (PASSWORD_MANAGEMENT.md)
- [ ] `npm run seed:menu` (populate menu)
- [ ] Test all pages locally
- [ ] Test admin dashboard
- [ ] Complete DEPLOYMENT_CHECKLIST.md
- [ ] Deploy using RENDER_DEPLOYMENT.md
- [ ] Test production URLs
- [ ] Monitor logs

---

## 🆘 Common Issues

| Issue | Fix |
|-------|-----|
| **Admin login fails** | Run `npm run seed:admin` |
| **MongoDB error** | Check MONGODB_URI in .env |
| **CORS error** | Check FRONTEND_URL in backend |
| **API not responding** | Check backend is running with `npm run dev` |
| **Port 5000 in use** | Kill process or change PORT |

---

## 🔗 Important URLs (Production)

|  | Local | Production |
|--|-------|------------|
| **Frontend** | http://localhost:3000 | https://foxstories-frontend.onrender.com |
| **API** | http://localhost:5000/api | https://foxstories-backend.onrender.com/api |
| **Admin** | http://localhost:3000/admin-login | https://foxstories-frontend.onrender.com/admin-login |

---

## 📝 File Structure

```
foxstories-mern/
├── DEPLOYMENT_CHECKLIST.md ← Start here for deploy
├── RENDER_DEPLOYMENT.md
├── PASSWORD_MANAGEMENT.md
├── DEPLOYMENT_READY.md
├── CHANGES_SUMMARY.md
├── QUICKSTART.md
├── backend/
│   ├── .env (local config - not in Git)
│   ├── .env.example (template)
│   ├── package.json (has gen:secret script)
│   └── src/
│       ├── server.js (CORS config)
│       ├── seedAdmin.js (create admin)
│       └── ...
└── frontend/
    ├── .env (API URL config)
    └── ...
```

---

## 🔋 Useful Commands

```bash
# Generate JWT Secret
npm run gen:secret

# Create Admin Account
npm run seed:admin

# Seed Menu Items  
npm run seed:menu

# Start Backend (Development)
npm run dev

# Start Backend (Production)
npm start

# Change MongoDB Password
# See PASSWORD_MANAGEMENT.md for details
```

---

## 🚨 Critical Security Items

**MUST DO BEFORE PRODUCTION:**
1. ✅ Generate new JWT_SECRET: `npm run gen:secret`
2. ✅ Change admin password (PASSWORD_MANAGEMENT.md)
3. ✅ Update FRONTEND_URL in backend/.env
4. ✅ Verify .env files are NOT in GitHub (check .gitignore)
5. ✅ Enable MongoDB backups

**NEVER:**
- ❌ Commit .env files to GitHub
- ❌ Share JWT_SECRET or passwords
- ❌ Use default admin credentials in production
- ❌ Set CORS to `origin: '*'`

---

## 📈 Deployment Pipeline

```
1. Generate JWT_SECRET (npm run gen:secret)
           ↓
2. Change Admin Password (PASSWORD_MANAGEMENT.md)
           ↓
3. Complete DEPLOYMENT_CHECKLIST.md
           ↓
4. Follow RENDER_DEPLOYMENT.md
           ↓
5. Test Live URLs
           ↓
6. Monitor Logs
           ↓
✅ PRODUCTION LIVE
```

---

## 📞 Quick Help

**Can't remember the steps?**
→ Read DEPLOYMENT_READY.md (5 min summary)

**How to deploy to Render?**
→ Follow RENDER_DEPLOYMENT.md (step-by-step)

**How to change admin password?**
→ Read PASSWORD_MANAGEMENT.md (multiple methods)

**What was changed in this update?**
→ See CHANGES_SUMMARY.md

**Getting errors?**
→ Check DEPLOYMENT_CHECKLIST.md Phase 8 (Troubleshooting)

---

## ✅ Final Verification

Run these commands to verify everything works:

```bash
# 1. Start backend
npm run dev

# 2. In new terminal, verify health
curl http://localhost:5000/api/health

# 3. Verify seeding
npm run seed:admin
npm run seed:menu

# 4. Test login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@foxstories.com","password":"Admin@123"}'

# 5. In browser, test frontend
open http://localhost:3000
```

If all checks pass ✅, you're ready for DEPLOYMENT_CHECKLIST.md!

---

**Last Updated:** March 12, 2026  
**Status:** Production Ready  
**Version:** 1.0

🚀 **Happy Deploying!** 🦊
