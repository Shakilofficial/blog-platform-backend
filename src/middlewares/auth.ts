import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../helpers/errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

const auth = (...roles: TUserRole[]) =>
  catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'Authentication token is missing ⚠️',
      );
    }

    // Decode the token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload & { id: string };

    const { id, role, email } = decoded;

    const user = await User.findOne({ _id: id, email });

    // if user not found
    if (!user) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'User not found 🔍');
    }
    // if user is blocked
    if (user.isBlocked) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'Your account is blocked ⛔',
      );
    }
    // if user has the required role
    if (roles.length && !roles.includes(role)) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'Access denied for the current role 🚫',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
export default auth;
