// src/routes/template.ts
import { Router } from 'express';
import {
  getAllTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} from '../controllers/templateController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createTemplateSchema,
  updateTemplateSchema,
} from '../schemas/templateSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllTemplates);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getTemplateById
);

router.post(
  '/',
  validateBody(createTemplateSchema),
  createTemplate
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateTemplateSchema),
  updateTemplate
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteTemplate
);

export default router;
