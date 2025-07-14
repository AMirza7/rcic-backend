// src/routes/featureAnnouncement.ts
import { Router } from 'express';
import {
  getAllFeatureAnnouncements,
  getFeatureAnnouncementById,
  createFeatureAnnouncement,
  updateFeatureAnnouncement,
  deleteFeatureAnnouncement,
} from '../controllers/featureAnnouncementController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createFeatureAnnouncementSchema,
  updateFeatureAnnouncementSchema,
} from '../schemas/featureAnnouncementSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllFeatureAnnouncements);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getFeatureAnnouncementById
);

router.post(
  '/',
  validateBody(createFeatureAnnouncementSchema),
  createFeatureAnnouncement
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateFeatureAnnouncementSchema),
  updateFeatureAnnouncement
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteFeatureAnnouncement
);

export default router;
