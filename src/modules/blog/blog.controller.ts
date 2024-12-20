import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { blogServices } from './blog.service';

// Blog controllers for handling blog-related operations
  // Create blog controller for creating a new blog
const createBlog = catchAsync(async (req, res) => {
  // Get userId from user object
  const userId = req.user?.id as JwtPayload;
  // Create blog with the userId and payload
  const payload = { ...req.body, author: userId };
  // Create the blog using the provided payload
  const result = await blogServices.createBlog(payload);
  // Send response with the created blog data
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

// Update blog controller for updating a blog
const updateBlog = catchAsync(async (req, res) => {
  // Get id and userId from request params and user object
  const id = req.params.id;
  const userId = req.user?.id as string;
  // Update the blog with the provided id, userId, and payload
  const result = await blogServices.updateBlog(id, userId, req.body);
  // Send response with the updated blog data
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

//Delete blog controller for deleting a blog
const deleteBlog = catchAsync(async (req, res) => {
  // Get id and userId from request params and user object
  const id = req.params.id;
  const userId = req.user?.id as string;
  // Delete the blog with the provided id and userId
  await blogServices.deleteBlog(id, userId);
  // Send response without data
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully',
  });
});

//Get single blog controller for retrieving a single blog
const getSingleBlog = catchAsync(async (req, res) => {
  // Get id from request params
  const id = req.params.id;
// Get single blog with the provided id
  const result = await blogServices.getSingleBlog(id);
  // Send response with the single blog data
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog retrieved successfully',
    data: result,
  });
});

// Get all blogs controller for retrieving all blogs
const getAllBlogs = catchAsync(async (req, res) => {
  // Get query from request query object
  const result = await blogServices.getAllBlogs(req.query);
  // Send response with the all blogs data
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blogs retrieved successfully',
    data: result,
  });
});

export const blogControllers = {
  createBlog,
  updateBlog,
  deleteBlog,
  getSingleBlog,
  getAllBlogs,
};
