import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../config';
import { IUSer, UserModel } from './user.interface';

// Define user schema
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
      unique: true, // Ensures that each email is unique
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      maxlength: [20, 'Password must be at most 20 characters long'],
      select: false, // Prevents password from being selected in the response
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not valid, please provide a valid role',
      },
      default: 'user', // by default, user role is user
    },
    isBlocked: {
      type: Boolean,
      default: false, // by default, user is not blocked
    },
  },
  { timestamps: true },
);

// Hash password before saving to database
userSchema.pre('save', async function (next) {
  const user = this as IUSer;
  // hasing the password using bcrypt and the salt rounds
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  // continue with the next middleware
  next();
});

//set '' after saving password
userSchema.post('save', function (doc) {
  doc.password = '';
});

// Exclude __v field before returning user data to client
userSchema.pre('find', function () {
  this.select('-__v');
});

// Exclude __v field for findOne,
userSchema.pre('findOne', function () {
  this.select('-__v');
});

export const User = model<IUSer, UserModel>('User', userSchema);
