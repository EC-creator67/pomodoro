# 🍕 Pomodoro - Food Delivery Application

A full-stack food delivery application with separate frontend for customers and admin panel for management.

## 📋 Features

### Customer Frontend

- Browse food menu by category
- Add items to cart
- User authentication (register/login)
- Place orders with Stripe payment
- Track order status
- View order history

### Admin Panel

- Add/Edit/Delete food items
- Manage orders
- View all orders with status
- Upload food images

### Backend API

- RESTful API with Express.js
- MongoDB database with Mongoose
- JWT authentication
- Stripe payment integration
- Image upload with Multer

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TailwindCSS, React Router
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT, Bcrypt
- **Payment**: Stripe
- **Deployment**: Vercel (Frontend/Admin), Render (Backend)

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- Stripe account (for payments)

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/EC-creator67/pomodoro.git
cd pomodoro
```

2. **Backend Setup**

```bash
cd backend
npm install
# Create .env file (see .env.example)
npm run server
```

3. **Frontend Setup**

```bash
cd frontend
npm install
# Create .env.local with VITE_API_URL=http://localhost:4000
npm run dev
```

4. **Admin Setup**

```bash
cd admin
npm install
# Create .env.local with VITE_API_URL=http://localhost:4000
npm run dev
```

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

Quick checklist: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

## 🌐 Live Demo

- **Frontend**: [Your Vercel URL]
- **Admin Panel**: [Your Vercel URL]
- **Backend API**: [Your Render URL]

## 📝 Environment Variables

### Backend (.env)

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
```

### Frontend & Admin (.env.local)

```
VITE_API_URL=http://localhost:4000
```

## 📂 Project Structure

```
pomodoro/
├── backend/          # Express API server
│   ├── config/       # Database configuration
│   ├── controllers/  # Route controllers
│   ├── middleware/   # Auth middleware
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   └── uploads/      # Uploaded images
├── frontend/         # Customer React app
│   └── src/
│       ├── components/
│       ├── context/
│       └── pages/
└── admin/            # Admin React app
    └── src/
        ├── components/
        └── pages/
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**EC-creator67**

- GitHub: [@EC-creator67](https://github.com/EC-creator67)

## 🙏 Acknowledgments

- React & Vite for the amazing development experience
- MongoDB Atlas for database hosting
- Stripe for payment processing
- Render & Vercel for free hosting

---

**Made with ❤️ by EC-creator67**
