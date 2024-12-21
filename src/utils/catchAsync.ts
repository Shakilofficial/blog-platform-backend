import { NextFunction, Request, RequestHandler, Response } from 'express';
// Catch Async Middleware for handling async/await functions

// Define the type for the catchAsync function
const catchAsync = (func: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Call the function and catch any errors that occur in the function and pass them to the next middleware
    Promise.resolve(func(req, res, next)).catch((error) => next(error));
  };
};

export default catchAsync;
