import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

import path from 'path';
import { fileURLToPath } from 'url';

// app config
const app = express();
const port = process.env.PORT || 4000;

// Ricostruzione di __dirname per moduli ES (import)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sostituisci la vecchia riga app.use('/images', express.static('uploads')); con questa:
app.use('/images', express.static(path.join(__dirname, 'uploads')));

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
          (allowed) => allowed && (origin.includes(allowed) || allowed.includes(origin))
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

// Assicurati che il nome della cartella 'uploads' coincida perfettamente
app.use('/images', express.static('uploads'));

// Middleware per garantire la connessione al DB
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection failed in middleware:', error);
    res.status(500).json({ success: false, message: 'Impossibile connettersi al Database' });
  }
});

// api endpoints
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send('Ciao Amici, API funziona!');
});

// Avvio del server sia in Locale che su Render
app.listen(port, '0.0.0.0', async () => {
  console.log(`Il Server lavora sulla porta ${port}`);
  try {
    await connectDB();
  } catch (error) {
    console.error('Errore connessione iniziale al DB:', error.message);
  }
});

export default app;