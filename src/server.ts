import app from './app';
import config from './config';
import { connectDB } from './config/db';

const start = async (): Promise<void> => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port} 🏃🏽‍♂️➡️`);
    });
  } catch (error) {
    console.error('🚨 Failed to start the server ❌', error);
    process.exit(1);
  }
};

start();
