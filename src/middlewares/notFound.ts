import { Request, Response } from 'express';

// Global Not Found handler middleware
const notFound = (req: Request, res: Response): void => {
  // Set status code to 404 and message to "Route not found"
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `Route not found for ${req.originalUrl} 🚨`,
  });
};

export default notFound;
