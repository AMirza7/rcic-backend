// src/routes/subscriptionPlan.ts
import { Router } from 'express';
import {
  getAllSubscriptionPlans,
  getSubscriptionPlanById,
  createSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
} from '../controllers/subscriptionPlanController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createSubscriptionPlanSchema,
  updateSubscriptionPlanSchema,
} from '../schemas/subscriptionPlanSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllSubscriptionPlans);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getSubscriptionPlanById
);

router.post(
  '/',
  validateBody(createSubscriptionPlanSchema),
  createSubscriptionPlan
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateSubscriptionPlanSchema),
  updateSubscriptionPlan
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteSubscriptionPlan
);

export default router;
