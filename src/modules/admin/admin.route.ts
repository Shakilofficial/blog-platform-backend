import { Router } from 'express';
import auth from '../../middlewares/auth';
import { adminControllers } from './admin.controller';

const router = Router();
// Block user route for blocking a user : Admin access only
router.patch('/users/:userId/block', auth('admin'), adminControllers.blockUser);
// Delete blog route for deleting a blog : Admin access only
router.delete('/blogs/:id', auth('admin'), adminControllers.deleteBlog);

export const adminRoutes = router;
