// src/routes/featureFlag.ts
import { Router } from 'express';
import {
  getAllFeatureFlags,
  getFeatureFlagByKey,
  createFeatureFlag,
  updateFeatureFlag,
  deleteFeatureFlag,
} from '../controllers/featureFlagController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createFeatureFlagSchema,
  updateFeatureFlagSchema,
} from '../schemas/featureFlagSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllFeatureFlags);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getFeatureFlagByKey
);

router.post(
  '/',
  validateBody(createFeatureFlagSchema),
  createFeatureFlag
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateFeatureFlagSchema),
  updateFeatureFlag
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteFeatureFlag
);

export default router;
