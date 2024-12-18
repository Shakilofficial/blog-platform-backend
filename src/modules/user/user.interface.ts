import { Model } from 'mongoose';

export interface IUSer {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}
export interface UserModel extends Model<IUSer, UserModel> {
  isUserExist(): Promise<IUSer | null>;
}
