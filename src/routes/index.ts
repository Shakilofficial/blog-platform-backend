import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { blogRoutes } from '../modules/blog/blog.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/blogs',
    route: blogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
