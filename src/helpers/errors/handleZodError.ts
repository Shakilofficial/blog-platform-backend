import { ZodError } from 'zod';
import { TErrorResponse } from '../../types/error';
// Function to handle Zod validation error
const handleZodError = (err: ZodError): TErrorResponse => {
  // Transforms an issue object into a simplified format.
  const errorSources = err.issues.map((issue) => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }));
  // Set status code to 400 and message to "Validation Error"
  return {
    statusCode: 400,
    message: 'Validation Error ⚠️',
    errorSources,
  };
};

export default handleZodError;
