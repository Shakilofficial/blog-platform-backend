/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUSer {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}
export interface UserModel extends Model<IUSer, UserModel> {
  isUserExist(_id: string): Promise<IUSer | null>;
}

export type TUserRole = keyof typeof USER_ROLE;
