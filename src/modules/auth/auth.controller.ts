import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

const register = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await authServices.register(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

export const authControllers = {
  register,
};
