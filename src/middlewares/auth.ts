import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../helpers/errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

// Auth middleware for checking user role and permissions
const auth = (...roles: TUserRole[]) =>
  catchAsync(async (req, res, next) => {
    // Get token from request headers and remove Bearer from the token string if present using split
    const token = req.headers.authorization?.split(' ')[1];

    // Check if token is present
    if (!token) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'Authentication token is missing ⚠️',
      );
    }

    // Decode the JWT token and get the decoded payload
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload & { id: string };

    const { id, role, email } = decoded;
    // Get user from the database using the decoded id
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
    // Set the decoded payload as the user property in the request object
    req.user = decoded as JwtPayload;
    // Continue to the next middleware
    next();
  });
export default auth;
