// src/routes/translationKeys.ts
import { Router } from 'express';
import {
  createTranslationKey,
  listTranslationKeys,
  getTranslationKey,
  updateTranslationKey,
  deleteTranslationKey
} from '../controllers/translationKeyController';
import { requireAuth } from '../middleware/authMiddleware';
import { validateBody, validateParams, validateQuery } from '../middleware/validate';
import { z } from 'zod';
import {
  createTranslationKeySchema,
  updateTranslationKeySchema,
  listTranslationKeysSchema,
} from '../schemas/translationKeySchemas';

const router = Router();

// UUID param schema
const idParam = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' })
});

// POST /api/translation-keys
router.post(
  '/',
  requireAuth,
  validateBody(createTranslationKeySchema),
  createTranslationKey
);

// GET /api/translation-keys?locale=…
router.get(
  '/',
  requireAuth,
  validateQuery(listTranslationKeysSchema, 'query'),
  listTranslationKeys
);

// GET /api/translation-keys/:id
router.get(
  '/:id',
  requireAuth,
  validateParams(idParam, 'params'),
  getTranslationKey
);

// PATCH /api/translation-keys/:id
router.patch(
  '/:id',
  requireAuth,
  validateParams(idParam, 'params'),
  validateBody(updateTranslationKeySchema),
  updateTranslationKey
);

// DELETE /api/translation-keys/:id
router.delete(
  '/:id',
  requireAuth,
  validateParams(idParam, 'params'),
  deleteTranslationKey
);

export default router;
