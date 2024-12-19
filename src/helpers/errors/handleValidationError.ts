import mongoose from 'mongoose';
import { TErrorResponse } from '../../types/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => ({
  statusCode: 400,
  message: 'Validation Error 🚫',
  errorSources: Object.values(err.errors).map((error) => ({
    path: error.path,
    message: error.message,
  })),
});

export default handleValidationError;
