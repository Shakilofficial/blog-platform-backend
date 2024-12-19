import mongoose, { model, Schema } from 'mongoose';
import { BlogModel, IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog, BlogModel>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [100, 'Title must be at most 100 characters long'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// Exclude __v field before returning user data to client
blogSchema.pre('find', function () {
  this.select('-__v');
});

// Exclude __v field for findOne,
blogSchema.pre('findOne', function () {
  this.select('-__v');
});

export const Blog = model<IBlog, BlogModel>('Blog', blogSchema);
