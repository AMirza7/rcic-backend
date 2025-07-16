import { Router } from 'express';
import {
  createLocaleConfig,
  listLocaleConfigs,
  getLocaleConfig,
  updateLocaleConfig,
  deleteLocaleConfig,
} from '../controllers/localeConfigController';
import { requireAuth } from '../middleware/authMiddleware';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createLocaleConfigSchema,
  updateLocaleConfigSchema,
} from '../schemas/localeConfigSchemas';

const router = Router();

// UUID validation for :id
const idParam = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.post(
  '/',
  requireAuth,
  validateBody(createLocaleConfigSchema),
  createLocaleConfig
);

router.get('/', requireAuth, listLocaleConfigs);

router.get(
  '/:id',
  requireAuth,
  validateParams(idParam, 'params'),
  getLocaleConfig
);

router.patch(
  '/:id',
  requireAuth,
  validateParams(idParam, 'params'),
  validateBody(updateLocaleConfigSchema),
  updateLocaleConfig
);

router.delete(
  '/:id',
  requireAuth,
  validateParams(idParam, 'params'),
  deleteLocaleConfig
);

export default router;
