import { Response } from 'express';

// Utility function to send response

// define the type for the response object
type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T | T[] | null;
};

// Function to send response
const sendResponse = <T>(
  res: Response,
  { statusCode, success, message = '', data }: TResponse<T>,
) => {
  
  // Check if data is empty or null and return response with status code and message
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return res.status(statusCode).json({
      success: success || false,
      message: message || 'No Data Found',
      statusCode: statusCode || 404,
    });
  }

  // Return response with status code, success, message, and data
  return res.status(statusCode).json({
    success,
    message,
    statusCode,
    data,
  });
};

export default sendResponse;
