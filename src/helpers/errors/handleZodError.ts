import { ZodError } from 'zod';
import { TErrorResponse } from '../../types/error';

const handleZodError = (err: ZodError): TErrorResponse => {
  const errorSources = err.issues.map((issue) => ({
    path: issue.path[issue.path.length - 1],
    message: issue.message,
  }));

  return {
    statusCode: 400,
    message: 'Validation Error ⚠️',
    errorSources,
  };
};

export default handleZodError;
