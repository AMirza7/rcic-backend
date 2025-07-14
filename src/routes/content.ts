// src/routes/content.ts
import { Router } from 'express';
import {
  getAllContent,
  getContentById,
  createContent,
  updateContent,
  deleteContent,
} from '../controllers/contentController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createContentSchema,
  updateContentSchema,
} from '../schemas/contentSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllContent);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getContentById
);

router.post(
  '/',
  validateBody(createContentSchema),
  createContent
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateContentSchema),
  updateContent
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteContent
);

export default router;
