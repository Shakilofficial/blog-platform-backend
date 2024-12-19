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

const login = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await authServices.login(payload);
  const { token } = result;
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User logged in successfully',
    data: { token },
  });
});

export const authControllers = {
  register,
  login,
};
