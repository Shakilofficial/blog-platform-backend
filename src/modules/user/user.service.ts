import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../helpers/errors/AppError';
import { userSearchableFields } from './user.constant';
import { User } from './user.model';

// User services for handling user-related operations

  // Get single user service for retrieving a single user
const getSingleUser = async (id: string) => {
  // Get the user with the provided id
  const user = await User.findById(id);

  // Check if User exists
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return user;
};

  // Get all users service for retrieving all users
const getAllUsers = async (query: Record<string, unknown>) => {
  // Create a new query builder with the User model and query object
  const Users = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .paginate()
    .sort()
    .fields();
  // Execute the query and return the result
  const result = await Users.modelQuery;
  return result;
};

export const userServices = {
  getSingleUser,
  getAllUsers,
};
