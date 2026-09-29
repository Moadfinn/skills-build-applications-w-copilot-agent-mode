import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose.connection;

export const connectDatabase = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown database error';
    console.warn('MongoDB unavailable; continuing with in-memory fallback data.', message);
  }
};

db.on('error', (error: unknown) => {
  const message = error instanceof Error ? error.message : 'Unknown connection error';
  console.warn('MongoDB connection error:', message);
});

export default db;
