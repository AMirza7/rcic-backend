// src/routes/appointmentFeedback.ts
import { Router } from 'express';
import {
  getAllAppointmentFeedback,
  getAppointmentFeedbackById,
  createAppointmentFeedback,
  updateAppointmentFeedback,
  deleteAppointmentFeedback,
} from '../controllers/appointmentFeedbackController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createAppointmentFeedbackSchema,
  updateAppointmentFeedbackSchema,
} from '../schemas/appointmentFeedbackSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllAppointmentFeedback);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getAppointmentFeedbackById
);

router.post(
  '/',
  validateBody(createAppointmentFeedbackSchema),
  createAppointmentFeedback
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateAppointmentFeedbackSchema),
  updateAppointmentFeedback
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteAppointmentFeedback
);

export default router;
