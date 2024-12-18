import { Router } from 'express';

const router = Router();

const moduleRoutes = [
  {
    path: '/path',
    route: ModuleRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
