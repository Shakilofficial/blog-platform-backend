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

export const blogRoutes = router;
