import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../helpers/errors/AppError';
import { createToken } from '../../utils/createToken';
import { IUSer } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

// Auth services for handling authentication-related operations

  // Register service for registering a new user
const register = async (payload: IUSer) => {
  //craete a new user with the provided payload
  const result = await User.create(payload);
  return result;
};

  // Login service for logging in a user
const login = async (payload: ILoginUser) => {
  //check if the email exists in the database
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
  // define jwt payload
  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.role,
  };
  // Create token and send it to the client
  const token = await createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  return {
    token,
  };
};

export const authServices = {
  register,
  login,
};
