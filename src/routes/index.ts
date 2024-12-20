import { Router } from 'express';
import { adminRoutes } from '../modules/admin/admin.route';
import { authRoutes } from '../modules/auth/auth.route';
import { blogRoutes } from '../modules/blog/blog.route';
import { userRoutes } from '../modules/user/user.route';

const router = Router();

// Routes for handling module-related operations
const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes, // Route for handling authentication-related operations
  },
  {
    path: '/admin',
    route: adminRoutes, // Route for handling admin-related operations
  },
  {
    path: '/blogs',
    route: blogRoutes, // Route for handling blog-related operations
  },
  {
    path: '/users',
    route: userRoutes, // Route for handling user-related operations
  },
];

// Add routes to the router
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
