// src/routes/notification.ts
import { Router } from 'express';
import {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
} from '../controllers/notificationController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createNotificationSchema,
  updateNotificationSchema,
} from '../schemas/notificationSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllNotifications);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getNotificationById
);

router.post(
  '/',
  validateBody(createNotificationSchema),
  createNotification
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateNotificationSchema),
  updateNotification
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteNotification
);

export default router;
