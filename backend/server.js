import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// app config
const app = express();
const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);

      const allowedOrigins =
        process.env.NODE_ENV === 'production'
          ? [process.env.FRONTEND_URL, process.env.ADMIN_URL]
          : ['http://localhost:5173', 'http://localhost:5174'];

      if (
        allowedOrigins.some(
          (allowed) => origin.includes(allowed) || allowed.includes(origin)
        )
      ) {
        callback(null, true);
      } else {
        callback(null, true); // Allow all origins for now
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Initialize database connection for serverless
let dbConnected = false;
const initDB = async () => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
};

// Middleware to ensure DB is connected
app.use(async (req, res, next) => {
  await initDB();
  next();
});

// api endpoints
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send('Ciao Amici, API funziona!');
});

// Start server for local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Il Server lavora su http://localhost:${port}`);
  });
}

// Export for Vercel serverless
export default app;
