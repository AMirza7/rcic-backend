// src/routes/appointment.ts
import { Router } from 'express';
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '../controllers/appointmentController';
import { validateBody } from '../middleware/validate';
import {
  createAppointmentSchema,
  updateAppointmentSchema,
} from '../schemas/appointmentSchemas';

const router = Router();

router.get('/', getAllAppointments);
router.get('/:id', getAppointmentById);

// Validate request body against the Zod schema before creating
router.post(
  '/',
  validateBody(createAppointmentSchema),
  createAppointment
);

// Validate request body against the Zod schema before updating
router.put(
  '/:id',
  validateBody(updateAppointmentSchema),
  updateAppointment
);

router.delete('/:id', deleteAppointment);

export default router;
