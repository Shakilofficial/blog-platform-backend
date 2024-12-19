import { StatusCodes } from 'http-status-codes';
import AppError from '../../helpers/errors/AppError';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlog = async (payload: IBlog) => {
  const result = (await Blog.create(payload)).populate('author');
  return result;
};

const updateBlog = async (
  id: string,
  userId: string,
  payload: Partial<IBlog>,
) => {
  const blog = await Blog.findById(id);
  // Check if blog exists
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  // Check if user is the author of the blog
  if (blog.author.toString() !== userId) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You can not update this blog',
    );
  }
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('author');
  return result;
};

const deleteBlog = async (id: string, userId: string) => {
  const blog = await Blog.findById(id);
  // Check if blog exists
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  // Check if user is the author of the blog
  if (blog.author.toString() !== userId) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'You can not delete this blog',
    );
  }

  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const getSingleBlog = async (id: string) => {
  const blog = await Blog.findById(id);

  // Check if blog exists
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  const result = blog.populate('author');
  return result;
};

const getAllBlogs = async () => {
  const result = await Blog.find().populate('author');
  return result;
};

export const blogServices = {
  createBlog,
  updateBlog,
  deleteBlog,
  getSingleBlog,
  getAllBlogs,
};
