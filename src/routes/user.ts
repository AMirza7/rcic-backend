// src/routes/user.ts
import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createUserSchema,
  updateUserSchema,
} from '../schemas/userSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllUsers);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getUserById
);

router.post(
  '/',
  validateBody(createUserSchema),
  createUser
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateUserSchema),
  updateUser
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteUser
);

export default router;
