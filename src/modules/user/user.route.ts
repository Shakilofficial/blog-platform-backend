import { Router } from 'express';
import auth from '../../middlewares/auth';
import { userControllers } from './user.controller';

const router = Router();

// Routes for handling user-related operations : Authorized user access only

// Get single user route for retrieving a single user : Authorized user access only
router.get('/:id', auth('admin', 'user'), userControllers.getSingleUser);

// Get all users route for retrieving all users : Admin access only
router.get('/', auth('admin'), userControllers.getAllUsers);

export const userRoutes = router;
