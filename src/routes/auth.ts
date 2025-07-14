// src/routes/auth.ts
import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';
import { validateBody } from '../middleware/validate';
import { registerSchema, loginSchema } from '../schemas/authSchemas';

const router = Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login)
router.post('/logout', logout);

export default router;
