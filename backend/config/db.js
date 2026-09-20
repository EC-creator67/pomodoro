import mongoose from 'mongoose';
import 'dotenv/config';

let cachedConnection = null;

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  // Verifica che la stringa di connessione sia presente
  if (!mongoUri) {
    throw new Error('MONGODB_URI non è definita nel file .env');
  }

  // Ritorna la connessione se già attiva (1 = connected)
  if (mongoose.connection.readyState === 1) {
    console.log('Utilizzo connessione DB in cache');
    return mongoose.connection;
  }

  try {
    const connection = await mongoose.connect(mongoUri, {
      bufferCommands: false,
      maxPoolSize: 10,
    });

    cachedConnection = connection;
    console.log('Connesso al DB');
    return connection;
  } catch (error) {
    console.error('Errore durante la connessione al DB:', error.message);
    throw error;
  }
};