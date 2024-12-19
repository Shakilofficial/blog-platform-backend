import { Router } from 'express';
import auth from '../../middlewares/auth';
import { adminControllers } from './admin.controller';

const router = Router();

router.patch('/users/:userId/block', auth('admin'), adminControllers.blockUser);

export const adminRoutes = router;
