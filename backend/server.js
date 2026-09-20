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

// middlewares
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:4000',
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL
].filter(Boolean); // Rimuove eventuali valori undefined o vuoti

app.use(
  cors({
    origin: function (origin, callback) {
      // Consente chiamate senza origin (es. Postman, mobile app, o chiamate interne)
      if (!origin) return callback(null, true);

      // Controlla se l'origin della chiamata è tra quelli consentiti
      const isAllowed = allowedOrigins.some(
        (allowed) => origin.includes(allowed) || allowed.includes(origin)
      );

      if (isAllowed) {
        callback(null, true);
      } else {
        // Fallback per consentire l'accesso se necessario
        callback(null, true);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Servizio file statici con percorso ASSOLUTO (Rimuovi qualsiasi altro duplicato di express.static)
app.use('/images', express.static(path.join(__dirname, 'uploads')));

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

// Avvio del server
app.listen(port, '0.0.0.0', async () => {
  console.log(`Il Server lavora sulla porta ${port}`);
  try {
    await connectDB();
  } catch (error) {
    console.error('Errore connessione iniziale al DB:', error.message);
  }
});

export default app;