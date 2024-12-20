import mongoose, { model, Schema } from 'mongoose';
import { BlogModel, IBlog } from './blog.interface';

// Define blog schema
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
      ref: 'User', // Reference to User model
      required: [true, 'Author is required'],
    },
    isPublished: {
      type: Boolean,
      default: true, // Default value for isPublished is true
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

// static method to check if a blog exists
blogSchema.statics.isBlogExist = async function (id: string) {
  const blog = await this.findById(id);
  return blog;
};

export const Blog = model<IBlog, BlogModel>('Blog', blogSchema);
