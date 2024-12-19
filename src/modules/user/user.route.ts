import { Router } from 'express';
import auth from '../../middlewares/auth';
import { userControllers } from './user.controller';

const router = Router();

router.get('/:id', auth('admin', 'user'), userControllers.getSingleUser);
router.get('/', auth('admin'), userControllers.getAllUsers);

export const userRoutes = router;
