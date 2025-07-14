// src/routes/userSubscription.ts
import { Router } from 'express';
import {
  getAllUserSubscriptions,
  getUserSubscriptionById,
  createUserSubscription,
  updateUserSubscription,
  deleteUserSubscription,
} from '../controllers/userSubscriptionController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createUserSubscriptionSchema,
  updateUserSubscriptionSchema,
} from '../schemas/userSubscriptionSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllUserSubscriptions);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getUserSubscriptionById
);

router.post(
  '/',
  validateBody(createUserSubscriptionSchema),
  createUserSubscription
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateUserSubscriptionSchema),
  updateUserSubscription
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteUserSubscription
);

export default router;
