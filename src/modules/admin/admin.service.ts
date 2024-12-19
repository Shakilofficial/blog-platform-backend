import { StatusCodes } from 'http-status-codes';
import { User } from '../user/user.model';
import AppError from '../../helpers/errors/AppError';

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
  // block the user
  const result = await User.findByIdAndUpdate(
    userId,
    { isBlocked: true },
    { new: true },
  );
  return result;
};

const deleteBlog = {};

export const adminServices = {
  blockUser,
  deleteBlog,
};
