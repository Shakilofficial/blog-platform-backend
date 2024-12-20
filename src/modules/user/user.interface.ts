/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

// Interface for user
export interface IUSer {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}
// extend the interface with mongoose model
export interface UserModel extends Model<IUSer, UserModel> {
  // static method to check if a user exists
  isUserExist(_id: string): Promise<IUSer | null>;
}

// Type for user roles
export type TUserRole = keyof typeof USER_ROLE;
