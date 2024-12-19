import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../helpers/errors/AppError';
import { createToken } from '../../utils/createToken';
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
  //create token and send it to the client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

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
