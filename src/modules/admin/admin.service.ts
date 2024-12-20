import { StatusCodes } from 'http-status-codes';
import AppError from '../../helpers/errors/AppError';
import { Blog } from '../blog/blog.model';
import { User } from '../user/user.model';

// Admin services for handling admin-related operations
// Block user service for blocking a user
const blockUser = async (userId: string, adminId: string) => {
  //check if the requester is an admin
  const admin = await User.findById(adminId);
  if (!admin) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }
  //check if the user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  // check if the user is already blocked
  if (user.isBlocked) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User is already blocked');
  }
  // block the user by setting isBlocked to true
  const result = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true },
  );
  return result;
};

//Delete blog service for deleting a blog
const deleteBlog = async (id: string, adminId: string) => {
  //check if the requester is an admin
  const admin = await User.findById(adminId);
  if (!admin) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }
  //check if the blog exists
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  // delete the blog directly
  await blog.deleteOne();
};

export const adminServices = {
  blockUser,
  deleteBlog,
};
