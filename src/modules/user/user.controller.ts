import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

// User controllers for handling user-related operations

  // Get single user controller for retrieving a single user
const getSingleUser = catchAsync(async (req, res) => {
  // Get id from request params
  const { id } = req.params;
  // Get single user with the provided id
  const result = await userServices.getSingleUser(id);
// Send response with the single user data
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

// Get all users controller for retrieving all users
const getAllUsers = catchAsync(async (req, res) => {
  // Get query from request query object
  const result = await userServices.getAllUsers(req.query);
  // Send response with the all users data
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

export const userControllers = {
  getSingleUser,
  getAllUsers,
};
