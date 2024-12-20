/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorResponse } from '../../types/error';
// Function to handle duplicate error
const handleDuplicateError = (err: any): TErrorResponse => {
  // Set status code to 400 and message to "Duplicate value detected"
  const field = Object.keys(err.keyValue || {})[0];
  const value = err.keyValue ? err.keyValue[field] : 'Unknown value';
  // Set errorSources to an array containing an object with path, message and value
  return {
    statusCode: 400,
    message: 'Duplicate value detected 🔄',
    errorSources: [
      {
        path: field || 'unknown',
        message: `The value ${value} for the field ${field} already exists.`,
      },
    ],
  };
};

export default handleDuplicateError;
