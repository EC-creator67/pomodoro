# Deployment Guide - Pomodoro Food Delivery

This guide will help you deploy your full-stack application to production.

## Architecture Overview

- **Backend**: Node.js + Express + MongoDB (Deploy to Render)
- **Frontend**: React + Vite (Deploy to Vercel)
- **Admin Panel**: React + Vite (Deploy to Vercel)

## Prerequisites

1. GitHub account (your repository is already set up)
2. [Render](https://render.com) account (free)
3. [Vercel](https://vercel.com) account (free)
4. MongoDB Atlas database (already configured)
5. Stripe account (if using payment features)

---

## Step 1: Deploy Backend to Render

### 1.1 Create a Render Account

1. Go to [render.com](https://render.com) and sign up
2. Connect your GitHub account

### 1.2 Deploy the Backend

1. Click "New +" → "Web Service"
2. Connect to your GitHub repository: `EC-creator67/pomodoro`
3. Configure the service:
   - **Name**: pomodoro-backend
   - **Region**: Choose closest to you (e.g., Oregon)
   - **Branch**: main
   - **Root Directory**: backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### 1.3 Add Environment Variables

In the Render dashboard, add these environment variables:

```
MONGO_URI=mongodb+srv://EC_Web:ecweb123@pomodoro.xbvgp1g.mongodb.net/Pomodoro
JWT_SECRET=your-secret-key-here-change-this
STRIPE_SECRET_KEY=your-stripe-secret-key-here
NODE_ENV=production
PORT=4000
```

⚠️ **IMPORTANT**:

- Change `JWT_SECRET` to a strong random string (at least 32 characters)
- Add your actual Stripe secret key if you're using payments

### 1.4 Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete (5-10 minutes)
3. Copy your backend URL: `https://pomodoro-backend-xxxx.onrender.com`

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Create a Vercel Account

1. Go to [vercel.com](https://vercel.com) and sign up
2. Connect your GitHub account

### 2.2 Deploy Frontend

1. Click "Add New..." → "Project"
2. Import your GitHub repository: `EC-creator67/pomodoro`
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
   - **Install Command**: `npm install`

### 2.3 Add Environment Variables

In the Vercel project settings, add:

```
VITE_API_URL=https://pomodoro-backend-xxxx.onrender.com
```

Replace `xxxx` with your actual Render backend URL (from Step 1.4)

### 2.4 Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Your frontend will be live at: `https://pomodoro-xxxx.vercel.app`

---

## Step 3: Deploy Admin Panel to Vercel

### 3.1 Deploy Admin

1. In Vercel, click "Add New..." → "Project"
2. Import the same GitHub repository again
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: admin
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
   - **Install Command**: `npm install`

### 3.2 Add Environment Variables

In the Vercel project settings, add:

```
VITE_API_URL=https://pomodoro-backend-xxxx.onrender.com
```

### 3.3 Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Your admin panel will be live at: `https://pomodoro-admin-xxxx.vercel.app`

---

## Step 4: Update Backend CORS (Important!)

After deploying frontend and admin, you need to update the backend to allow requests from your new domains.

1. Go to your backend code
2. Update `server.js` to include your deployed URLs in CORS configuration:

```javascript
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://pomodoro-xxxx.vercel.app',
      'https://pomodoro-admin-xxxx.vercel.app',
    ],
    credentials: true,
  })
);
```

3. Commit and push the changes - Render will auto-deploy

---

## Step 5: Test Your Deployment

### Backend API

Test your backend: `https://pomodoro-backend-xxxx.onrender.com`

You should see: "Ciao Amici, API funziona!"

### Frontend

Visit: `https://pomodoro-xxxx.vercel.app`

- Test user registration
- Test adding items to cart
- Test the order flow

### Admin Panel

Visit: `https://pomodoro-admin-xxxx.vercel.app`

- Login as admin
- Test adding/removing food items
- Check orders

---

## Important Notes

### Free Tier Limitations

**Render (Backend)**:

- ✅ Free for 750 hours/month
- ⚠️ Spins down after 15 minutes of inactivity (cold start = 30-60 seconds)
- ⚠️ Limited to 512MB RAM
- 💡 First request after inactivity will be slow

**Vercel (Frontend/Admin)**:

- ✅ Unlimited bandwidth
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Instant deployments

### File Uploads

⚠️ **Important**: The current setup saves uploaded images to the server's file system. On Render's free tier, these files will be deleted when the server restarts.

**Recommended Solution**: Use a cloud storage service like:

- Cloudinary (free tier: 25GB storage)
- AWS S3
- DigitalOcean Spaces

### Database

✅ Your MongoDB Atlas database is already configured and will work in production.

---

## Continuous Deployment

Your apps are now set up for **automatic deployment**:

- Push to GitHub → Vercel and Render automatically deploy
- No manual deployment needed!

---

## Troubleshooting

### Backend not connecting to database

- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Verify MONGO_URI environment variable in Render

### CORS errors

- Make sure backend CORS includes your Vercel URLs
- Check if URLs in environment variables match exactly

### Images not loading

- Check that VITE_API_URL environment variable is set correctly
- Verify backend is serving static files from `/uploads`

### Cold starts (backend slow on first request)

- This is normal on Render's free tier
- Consider upgrading to paid plan for always-on instances

---

## Next Steps

1. **Custom Domain**: Add your own domain in Vercel settings
2. **Environment Security**: Rotate JWT_SECRET and other secrets regularly
3. **Monitoring**: Set up monitoring with Render's built-in logs
4. **Database Backups**: Enable automatic backups in MongoDB Atlas
5. **Cloud Storage**: Migrate file uploads to Cloudinary or S3

---

## Support URLs

- **Backend**: https://pomodoro-backend-xxxx.onrender.com
- **Frontend**: https://pomodoro-xxxx.vercel.app
- **Admin**: https://pomodoro-admin-xxxx.vercel.app

Replace `xxxx` with your actual deployment IDs.

---

## Local Development

To run locally after cloning:

```bash
# Backend
cd backend
npm install
# Create .env file with your environment variables
npm run server

# Frontend
cd frontend
npm install
# Create .env.local with VITE_API_URL=http://localhost:4000
npm run dev

# Admin
cd admin
npm install
# Create .env.local with VITE_API_URL=http://localhost:4000
npm run dev
```

---

**Congratulations! Your application is now deployed! 🎉**
