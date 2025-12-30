# ⚠️ IMPORTANT: File Uploads on Vercel

Vercel's serverless functions have a **READ-ONLY** file system. The current file upload system that saves to `/uploads` will NOT work on Vercel.

## Quick Fix Options:

### Option 1: Use Cloudinary (Recommended - FREE)
1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Install: `npm install cloudinary`
3. Update multer configuration to use Cloudinary storage

### Option 2: Use Render Instead (Easier)
Deploy backend to Render (as originally recommended in DEPLOYMENT.md) - no code changes needed!

### Option 3: Use Vercel Blob Storage
Use Vercel's blob storage (paid feature after free tier)

## Current Status:
- ✅ Backend API will work on Vercel
- ❌ File uploads will fail (images won't persist)
- ✅ All other features (auth, cart, orders) will work

## Recommended Action:
Follow the original deployment guide ([DEPLOYMENT.md](./DEPLOYMENT.md)) and deploy backend to **Render** instead of Vercel. It's simpler and free!
