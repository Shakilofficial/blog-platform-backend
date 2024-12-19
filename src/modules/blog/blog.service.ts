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
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
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

export const blogServices = {
  createBlog,
  updateBlog,
};
