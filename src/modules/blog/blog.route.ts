import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { blogControllers } from './blog.controller';
import { blogValidations } from './blog.validation';

const router = Router();

// Routes for handling blog-related operations

//create blog route for creating a new blog : Authorized user access only
router.post(
  '/',
  auth('user', 'admin'),
  validateRequest(blogValidations.createBlogValidationSchema),
  blogControllers.createBlog,
);

// update blog route for updating a blog : Authorized user access only
router.patch(
  '/:id',
  auth('user', 'admin'),
  validateRequest(blogValidations.updateBlogValidationSchema),
  blogControllers.updateBlog,
);

// delete blog route for deleting a blog : Authorized user access only
router.delete('/:id', auth('user', 'admin'), blogControllers.deleteBlog);

//get single blog route for retrieving a single blog : Public access
router.get('/:id', blogControllers.getSingleBlog);

// get all blogs route for retrieving all blogs : Public access
router.get('/', blogControllers.getAllBlogs);

export const blogRoutes = router;
