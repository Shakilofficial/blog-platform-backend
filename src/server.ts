import app from './app';
import config from './config';
import { connectDB } from './config/db';

// Define the start function to start the server
const start = async (): Promise<void> => {
  try {
    // Connect to the database
    await connectDB();
    // Listen to the port
    app.listen(config.port, () => {
      console.log(`🚀 Server is running on port ${config.port} 🏃🏽‍♂️➡️`);
    });
    // Handle errors and rejections
  } catch (error) {
    console.error('🚨 Failed to start the server ❌', error);
    // Exit the process with a non-zero exit code
    process.exit(1);
  }
};

//By calling the start function, the server will start running
start();
