import mongoose from 'mongoose';
import config from '.';

export const connectDB = async () => {
  try {
    // Connect to the database
    await mongoose.connect(config.database_uri as string);
    console.log('🌱 Database connected successfully ✅');
  } catch (err) {
    // Log the error and exit the process
    console.error('🚨 Database connection failed ❌:', err);
    process.exit(1);
  }
};
