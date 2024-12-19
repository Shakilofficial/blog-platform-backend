import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../helpers/errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'Authentication token is missing ❌',
      );
    }

    //decode the token if it is a valid token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, email } = decoded;

    const user = await User.findOne({ email });
    //check if the user is exist
    if (!user) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'User not found 🔍');
    }
    //check if the user is blocked
    if (user.isBlocked) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'Your account is blocked ⛔',
      );
    }
    //check if the user has the required role
    if (roles && !roles.includes(role)) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'Access denied for the current role 🚫',
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
