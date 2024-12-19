import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../helpers/errors/AppError';
import { userSearchableFields } from './user.constant';
import { User } from './user.model';

const getSingleUser = async (id: string) => {
  const user = await User.findById(id);

  // Check if User exists
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  return user;
};

const getAllUsers = async (query: Record<string, unknown>) => {
  const Users = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .paginate()
    .sort()
    .fields();
  const result = await Users.modelQuery;
  return result;
};

export const userServices = {
  getSingleUser,
  getAllUsers,
};
