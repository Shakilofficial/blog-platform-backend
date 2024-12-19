import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../helpers/errors/AppError';
import { IUSer } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const register = async (payload: IUSer) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');
  // Check if user exists
  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }
  // Check if user is blocked
  if (user.isBlocked) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User is blocked');
  }
  //Check if password matches
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid Password');
  }
  
  return {
    user,
  };
};

export const authServices = {
  register,
  login,
};
