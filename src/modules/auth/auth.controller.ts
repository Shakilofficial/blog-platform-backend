import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './auth.service';

// Auth controllers for handling authentication-related operations
// Register controller for registering a new user
const register = catchAsync(async (req, res) => {
  // Get payload from request body
  const payload = req.body;
  // Register the user
  const result = await authServices.register(payload);
  // Send response with the registered user data
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

//Login controller for logging in a user
const login = catchAsync(async (req, res) => {
  // Get payload from request body
  const payload = req.body;
  // Login the user
  const result = await authServices.login(payload);
  // Send response with the token
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
