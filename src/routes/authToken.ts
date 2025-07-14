// src/routes/authToken.ts
import { Router } from 'express';
import {
  getAllAuthTokens,
  getAuthTokenById,
  createAuthToken,
  updateAuthToken,
  deleteAuthToken,
} from '../controllers/authTokenController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createAuthTokenSchema,
  updateAuthTokenSchema,
} from '../schemas/authTokenSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllAuthTokens);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getAuthTokenById
);

router.post(
  '/',
  validateBody(createAuthTokenSchema),
  createAuthToken
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateAuthTokenSchema),
  updateAuthToken
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteAuthToken
);

export default router;
