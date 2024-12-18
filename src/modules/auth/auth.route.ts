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

export const authRoutes = router;
