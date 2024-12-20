import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authControllers } from './auth.controller';
import { authValidations } from './auth.validation';

const router = Router();

// Register route for registering a new user 
router.post(
  '/register',
  validateRequest(authValidations.registerValidationSchema),
  authControllers.register,
);

// Login route for logging in a registered user
router.post(
  '/login',
  validateRequest(authValidations.loginValidationSchema),
  authControllers.login,
);

export const authRoutes = router;
