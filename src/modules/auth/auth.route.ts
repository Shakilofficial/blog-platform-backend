import express from 'express';
import { authControllers } from './auth.controller';

const router = express.Router();

router.post('/register', authControllers.register);

export const authRoutes = router;
