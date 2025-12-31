import mongoose from 'mongoose';
import 'dotenv/config';

// Cache the database connection
let cachedConnection = null;

export const connectDB = async () => {
  // If already connected, return cached connection
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log('Using cached DB connection');
    return cachedConnection;
  }

  try {
    const mongoUri =
      process.env.MONGODB_URI ||
      'mongodb+srv://EC_Web:ecweb123@pomodoro.xbvgp1g.mongodb.net/Pomodoro';

    const connection = await mongoose.connect(mongoUri, {
      bufferCommands: false,
      maxPoolSize: 10,
    });

    cachedConnection = connection;
    console.log('Connesso al DB');
    return connection;
  } catch (error) {
    console.error('DB connection error:', error);
    throw error;
  }
};
