#!/usr/bin/env node

/**
 * Generate a secure JWT SECRET for production
 * Run: node scripts/generate-jwt-secret.js
 */

const crypto = require('crypto');

// Generate 32 bytes (256 bits) of random data, converted to hex
const jwtSecret = crypto.randomBytes(32).toString('hex');

console.log('\n=== JWT SECRET GENERATOR ===\n');
console.log('New secure JWT_SECRET:');
console.log(jwtSecret);
console.log('\nSteps to update:');
console.log('1. Copy the secret above');
console.log('2. Update backend/.env: JWT_SECRET=' + jwtSecret);
console.log('3. Add to Render dashboard:');
console.log('   - Go to your backend service');
console.log('   - Environment > Edit Environment Variables');
console.log('   - Add/Update: JWT_SECRET=' + jwtSecret);
console.log('   - Save & Deploy');
console.log('\n⚠️  IMPORTANT: Never commit secrets to GitHub!\n');
