import mongoose from 'mongoose';
import { TErrorResponse } from '../../types/error';
// Function to handle validation error
const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => ({
  // Set status code to 400 and message to "Validation Error"
  statusCode: 400,
  message: 'Validation Error 🚫',
  //Transforms an error object into a simplified format.
  errorSources: Object.values(err.errors).map((error) => ({
    path: error.path,
    message: error.message,
  })),
});

export default handleValidationError;
