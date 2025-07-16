import { Router } from 'express';
import {
  getStorageUsage,
  updateStorageUsage
} from '../controllers/storageUsageController';
import { requireAuth } from '../middleware/authMiddleware';
import { validateParams, validateBody } from '../middleware/validate';
import { z } from 'zod';
import { updateStorageUsageSchema } from '../schemas/storageUsageSchemas';

const router = Router();

// UUID validation for :userId
const userIdParam = z.object({
  userId: z.string().uuid({ message: 'userId must be a valid UUID' }),
});

router.get(
  '/:userId',
  requireAuth,
  validateParams(userIdParam, 'params'),
  getStorageUsage
);

router.patch(
  '/:userId',
  requireAuth,
  validateParams(userIdParam, 'params'),
  validateBody(updateStorageUsageSchema),
  updateStorageUsage
);

export default router;
