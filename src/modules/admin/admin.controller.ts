import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminServices } from './admin.service';

// Admin controllers for handling admin-related operations
// Block user controller for blocking a user
const blockUser = catchAsync(async (req, res) => {
  // Get userId from request params and adminId from user object
  const { userId } = req.params;
  const adminId = req.user?.id as string;
  // Block the user by userId using the adminId
  await adminServices.blockUser(userId, adminId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User blocked successfully',
  });
});

//Delete blog controller for deleting a blog
const deleteBlog = catchAsync(async (req, res) => {
  // Get id from request params and adminId from user object
  const { id } = req.params;
  const adminId = req.user?.id as string;
  // Delete the blog by id using the adminId
  await adminServices.deleteBlog(id, adminId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});

export const adminControllers = {
  blockUser,
  deleteBlog,
};
