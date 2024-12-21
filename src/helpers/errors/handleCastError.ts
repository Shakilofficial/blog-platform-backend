import mongoose from 'mongoose';
import { TErrorResponse } from '../../types/error';
// Function to handle cast error
const handleCastError = (err: mongoose.Error.CastError): TErrorResponse => ({
  // Set status code to 400 and message to "Invalid {path} value"
  statusCode: 400,
  message: `Invalid ${err.path} value 🚫`,
  errorSources: [
    {
      path: err.path,
      message: err.message,
    },
  ],
});

export default handleCastError;
