// src/routes/userLanguage.ts
import { Router } from 'express';
import { z } from 'zod';
import { validateBody, validateParams } from '../middleware/validate';
import {
  createUserLanguage,
  getUserLanguage,
  updateUserLanguage,
  deleteUserLanguage
} from '../controllers/userLanguageController';
import {
  createUserLanguageSchema,
  updateUserLanguageSchema
} from '../schemas/userLanguageSchema';

const router = Router();

// Reusable Zod schema for the :userId param
const userIdParam = z.object({
  userId: z.string().uuid({ message: 'userId must be a valid UUID' }),
});

router.post(
  '/',
  validateBody(createUserLanguageSchema),
  createUserLanguage
);

router.get(
  '/:userId',
  validateParams(userIdParam, 'params'),
  getUserLanguage
);

router.put(
  '/:userId',
  validateParams(userIdParam, 'params'),
  validateBody(updateUserLanguageSchema),
  updateUserLanguage
);

router.delete(
  '/:userId',
  validateParams(userIdParam, 'params'),
  deleteUserLanguage
);

export default router;
