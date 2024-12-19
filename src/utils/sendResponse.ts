import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T | T[] | null;
};

const sendResponse = <T>(
  res: Response,
  { statusCode, success, message = '', data }: TResponse<T>,
) => {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return res.status(statusCode).json({
      success: success || false,
      message: message || 'No Data Found',
      statusCode: statusCode || 404,
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
