import mongoose from 'mongoose';
import { TErrorResponse } from '../../types/error';

const handleCastError = (err: mongoose.Error.CastError): TErrorResponse => ({
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
