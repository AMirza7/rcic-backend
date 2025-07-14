// src/schemas/appointmentFeedbackSchemas.ts
import { z } from 'zod';

export const createAppointmentFeedbackSchema = z.object({
  appointmentId: z.string().uuid({ message: 'appointmentId must be a valid UUID' }),
  userId:        z.string().uuid({ message: 'userId must be a valid UUID' }),
  rating:        z.number().int().min(1).max(5, { message: 'rating must be between 1 and 5' }),
  comments:      z.string().optional(),
  submittedAt:   z.string().refine((val) => !isNaN(Date.parse(val)), {
                   message: 'submittedAt must be a valid ISO date string',
                 }),
});

export const updateAppointmentFeedbackSchema = createAppointmentFeedbackSchema.partial();
