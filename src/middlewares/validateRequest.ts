import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

// Validate request middleware
const validateRequest = (schema: AnyZodObject) => {
  // Validate request body using the provided schema
  return catchAsync(async (req, res, next) => {
    // Parse the request body using the provided schema
    await schema.parseAsync({
      body: req.body,
    });
    // Continue to the next middleware
    next();
  });
};

export default validateRequest;
