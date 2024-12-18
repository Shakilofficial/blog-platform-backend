import { IUSer } from '../user/user.interface';
import { User } from '../user/user.model';

const register = async (payload: IUSer) => {
  const result = await User.create(payload);
  return result;
};

export const authServices = {
  register,
};
