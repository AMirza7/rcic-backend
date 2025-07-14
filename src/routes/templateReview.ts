// src/routes/templateReview.ts
import { Router } from 'express';
import {
  getAllTemplateReviews,
  getTemplateReviewById,
  createTemplateReview,
  updateTemplateReview,
  deleteTemplateReview,
} from '../controllers/templateReviewController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createTemplateReviewSchema,
  updateTemplateReviewSchema,
} from '../schemas/templateReviewSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllTemplateReviews);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getTemplateReviewById
);

router.post(
  '/',
  validateBody(createTemplateReviewSchema),
  createTemplateReview
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateTemplateReviewSchema),
  updateTemplateReview
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteTemplateReview
);

export default router;
