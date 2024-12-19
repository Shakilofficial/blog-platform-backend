import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminServices } from './admin.service';

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const adminId = req.user?.id as string;

  await adminServices.blockUser(userId, adminId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User blocked successfully',
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const adminId = req.user?.id as string;

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
