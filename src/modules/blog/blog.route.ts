import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { blogControllers } from './blog.controller';
import { blogValidations } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  auth('user', 'admin'),
  validateRequest(blogValidations.createBlogValidationSchema),
  blogControllers.createBlog,
);

router.patch(
  '/:id',
  auth('user', 'admin'),
  validateRequest(blogValidations.updateBlogValidationSchema),
  blogControllers.updateBlog,
);

export const blogRoutes = router;
