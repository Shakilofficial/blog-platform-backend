import { model, Schema } from 'mongoose';
import { IUSer, UserModel } from './user.interface';

const userSchema = new Schema<IUSer, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [30, 'Name must be at most 30 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      minlength: [3, 'Email must be at least 3 characters long'],
      maxlength: [30, 'Email must be at most 30 characters long'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      maxlength: [30, 'Password must be at most 30 characters long'],
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not valid, please provide a valid role',
      },
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const User = model<IUSer, UserModel>('User', userSchema);
