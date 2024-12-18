import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T | T[] | null;
};

const sendResponse = <T>(
  res: Response,
  { statusCode, success, message = '', data }: TResponse<T>,
) => {
  // If success is false, return a 404 status code with the message
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return res.status(404).json({
      success: false,
      message: message || 'No Data Found',
      statusCode: 404,
      data: [],
    });
  }

  return res.status(statusCode).json({
    success,
    message,
    statusCode,
    data,
  });
};

export default sendResponse;
