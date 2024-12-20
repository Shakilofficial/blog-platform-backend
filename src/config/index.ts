import dotenv from 'dotenv';
import path from 'path';
// Load environment variables from .env file
dotenv.config({ path: path.join(process.cwd(), '.env') });
// Export environment variables
export default {
  port: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  database_uri: process.env.DATABASE_URI,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
};
