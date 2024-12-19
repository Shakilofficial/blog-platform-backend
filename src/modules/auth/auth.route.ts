import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authControllers } from './auth.controller';
import { authValidations } from './auth.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(authValidations.registerValidationSchema),
  authControllers.register,
);

router.post(
  '/login',
  validateRequest(authValidations.loginValidationSchema),
  authControllers.login,
);

export const authRoutes = router;
