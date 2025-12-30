# Quick Deployment Checklist ✅

## 🚀 Backend (Render)
- [ ] Create Render account at render.com
- [ ] New Web Service → Connect GitHub repo
- [ ] Root Directory: `backend`
- [ ] Build: `npm install` | Start: `npm start`
- [ ] Add Environment Variables:
  - MONGO_URI
  - JWT_SECRET (generate strong secret!)
  - STRIPE_SECRET_KEY
  - NODE_ENV=production
- [ ] Deploy & copy backend URL

## 🌐 Frontend (Vercel)
- [ ] Create Vercel account at vercel.com
- [ ] New Project → Import GitHub repo
- [ ] Root Directory: `frontend`
- [ ] Add Environment Variable:
  - VITE_API_URL=<your-render-backend-url>
- [ ] Deploy & copy frontend URL

## 🔧 Admin (Vercel)
- [ ] New Project → Import same GitHub repo
- [ ] Root Directory: `admin`
- [ ] Add Environment Variable:
  - VITE_API_URL=<your-render-backend-url>
- [ ] Deploy & copy admin URL

## ⚙️ Final Steps
- [ ] Update backend CORS with your Vercel URLs
- [ ] Test all three deployments
- [ ] Update MongoDB Atlas to allow all IPs (0.0.0.0/0)

---

📖 Full guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
