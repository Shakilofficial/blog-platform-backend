import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../helpers/errors/AppError';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import { blogSearchableFields } from './blog.constant';

// Blog services for handling blog-related operations

  // Create blog service for creating a new blog
const createBlog = async (payload: IBlog) => {
  // Create the blog with the provided payload and populate the author field
  const result = (await Blog.create(payload)).populate('author');
  return result;
};

  // Update blog service for updating a blog
const updateBlog = async (
  id: string,
  userId: string,
  payload: Partial<IBlog>,
) => {
  // Get the blog with the provided id
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
  // Update the blog with the provided id, payload, and options and populate the author field
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).populate('author');

  return result;
};

  // Delete blog service for deleting a blog
const deleteBlog = async (id: string, userId: string) => {
  // Get the blog with the provided id
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
  // Delete the blog directly
  await blog.deleteOne();
};


  // Get single blog service for retrieving a single blog
const getSingleBlog = async (id: string) => {
  // Get the blog with the provided id
  const blog = await Blog.findById(id);

  // Check if blog exists
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }
  // Populate the author field
  const result = blog.populate('author');
  return result;
};

// Get all blogs service for retrieving all blogs 
const getAllBlogs = async (query: Record<string, unknown>) => {
  // Create a new query builder with the Blog model and query object and populate the author field
  const blogs = new QueryBuilder(Blog.find().populate('author'), query)
    .search(blogSearchableFields)
    .filter()
    .paginate()
    .sort()
    .fields();
  // Execute the query and return the result
  const result = await blogs.modelQuery;
  return result;
};

export const blogServices = {
  createBlog,
  updateBlog,
  deleteBlog,
  getSingleBlog,
  getAllBlogs,
};
