import { Router } from 'express';
import { adminRoutes } from '../modules/admin/admin.route';
import { authRoutes } from '../modules/auth/auth.route';
import { blogRoutes } from '../modules/blog/blog.route';
import { userRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/admin',
    route: adminRoutes,
  },
  {
    path: '/blogs',
    route: blogRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
