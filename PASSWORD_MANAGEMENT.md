# 🔐 Admin Password Management Guide

Security best practices for managing your Fox Stories admin account.

---

## Initial Setup

### Default Credentials
After running `npm run seed:admin`, your admin account is:

```
Email: admin@foxstories.com
Password: Admin@123
```

⚠️ **IMPORTANT:** Change this password immediately after first login!

---

## Method 1: Change Password via UI (Recommended)

**If you have a password change form in your admin dashboard:**

1. Log in to `http://localhost:3000/admin`
2. Navigate to Settings or Account section
3. Find "Change Password" option
4. Enter current password: `Admin@123`
5. Enter new password (see requirements below)
6. Confirm new password
7. Save

**Password Requirements:**
- Minimum 12 characters
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 number (0-9)
- At least 1 special character (!@#$%^&*)

**Example:** `FoxStories@2024!Secure`

---

## Method 2: Change Password via MongoDB Compass (If UI unavailable)

### Prerequisites
- MongoDB Compass installed (https://www.mongodb.com/products/tools/compass)
- Access to your MongoDB instance

### Steps

1. **Open MongoDB Compass**
2. **Connect to MongoDB:**
   - Connection string: your MONGODB_URI
   - Click Connect

3. **Navigate to Database:**
   - Select `foxstories` database
   - Select `admins` collection

4. **Find Admin Document:**
   - Should see one document with email `admin@foxstories.com`

5. **Update Password Hash:**
   - Click on the document to edit
   - Find the `password` field
   - To hash a new password, use Node.js:
   
   ```bash
   node -e "
   const bcrypt = require('bcryptjs');
   const password = 'YourNewSecurePassword123!';
   const hash = bcrypt.hashSync(password, 12);
   console.log('Hash:', hash);
   "
   ```

   - Copy the hash output
   - Replace the `password` field value with the hash
   - Click Update

6. **Verify Login:**
   ```bash
   curl -X POST http://localhost:5000/api/admin/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@foxstories.com","password":"YourNewSecurePassword123!"}'
   ```

---

## Method 3: Change via mongosh (Terminal)

### For Local Development

```bash
# Connect to MongoDB
mongosh "mongodb://localhost:27017/foxstories"

# Run in mongosh console
const bcrypt = require('bcryptjs');
const newPassword = 'YourNewSecurePassword123!';
const hashedPassword = bcrypt.hashSync(newPassword, 12);

db.admins.updateOne(
  { email: 'admin@foxstories.com' },
  { $set: { password: hashedPassword } }
);

# Response: { acknowledged: true, modifiedCount: 1 }
```

### For MongoDB Atlas

```bash
# Connect to Atlas
mongosh "mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/foxstories"

# Then run the update command above
```

---

## Method 4: Reset to Default (Emergency Only)

If you forget your password and can't change it:

```bash
# Reset to default: Admin@123
node src/seedAdmin.js
```

⚠️ This will overwrite the current admin credentials with defaults!

---

## Security Best Practices

### 1. Strong Password Policy
- ✓ Use 12+ characters
- ✓ Mix uppercase, lowercase, numbers, symbols
- ✓ Avoid dictionary words
- ✓ Don't use personal information
- ✗ Don't reuse passwords across sites
- ✗ Don't share password via email or Slack

### 2. Change Frequency
- Change password: **Every 90 days**
- After any team member leaves
- If you suspect compromise
- After each major deployment

### 3. Access Control
- [ ] Only share admin login with trusted team members
- [ ] Use temporary passwords for new admins
- [ ] Create separate admin accounts per team member (when available)
- [ ] Log out after each session

### 4. Two-Factor Authentication (Future)
Consider implementing 2FA when available:
- SMS code
- Authenticator app (Google Authenticator, Authy)
- Hardware security key

---

## Multiple Admin Accounts (Future Feature)

When implemented, you can:

1. Create individual admin accounts for each team member
2. Fine-grained permissions (view vs. edit vs. delete)
3. Audit logs showing who changed what

For now, use the single account securely with the practices above.

---

## Password Storage Safety

### In Your System
```bash
# Store in password manager, NOT in:
❌ Plain text files
❌ Browser auto-fill
❌ Notes app
❌ Email
❌ Version control

✓ Password Manager (1Password, LastPass, Bitwarden)
✓ Encrypted notes
✓ Dedicated hardware key
```

### Environment Variables
- .env files are already in .gitignore
- Never commit .env to GitHub
- .env is only for local development
- Production: Use hosting provider's environment settings (Render)

---

## Troubleshooting

### "Password reset failed"
- Verify MongoDB is running
- Check connection string
- Ensure `bcryptjs` is installed: `npm install bcryptjs`

### "Can't connect to MongoDB Atlas"
- Check MONGODB_URI in .env
- Verify IP whitelist (Atlas → Security → Network Access)
- Test connection: `mongosh "your_connection_string"`

### "Login still fails with new password"
- Verify hash was updated correctly
- Clear browser cache (Ctrl+Shift+Delete)
- Try API call directly:
  ```bash
  curl -X POST http://localhost:5000/api/admin/login \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@foxstories.com","password":"your_new_password"}'
  ```

### "I keep forgetting my password"
- Use a password manager
- Write down password in secure location
- Set calendar reminder to change monthly

---

## Emergency Recovery

**If locked out completely:**

1. Stop the backend: `Ctrl+C`
2. Run seed script: `npm run seed:admin`
3. Default password will be restored
4. Login with `admin@foxstories.com` / `Admin@123`
5. Immediately change password again

---

## Security Audit Checklist

Before production deployment:

- [ ] Initial default password changed
- [ ] New password meets 12+ character requirement
- [ ] Special characters included in password
- [ ] Password not used anywhere else
- [ ] .env files are in .gitignore
- [ ] No passwords committed to GitHub
- [ ] Only authorized team members have access
- [ ] Change password logged/documented

---

## Resources

- **OWASP Password Guidelines:** https://owasp.org/www-community/authentication/password-storage-cheat-sheet
- **Password Generator:** https://bitwarden.com/password-generator/
- **Password Manager Comparison:** https://www.pcmag.com/news/the-best-password-managers

---

**Last Updated:** March 12, 2026
**Version:** 1.0
