// src/schemas/appointmentSchemas.ts
import { z } from 'zod';

export const createAppointmentSchema = z.object({
  consultantId: z.string().uuid({ message: 'consultantId must be a valid UUID' }),
  clientId:     z.string().uuid({ message: 'clientId must be a valid UUID' }),
  date:         z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'date must be a valid ISO date string',
  }),
  time:         z.string().regex(/^\d{2}:\d{2}$/, {
    message: 'time must be in HH:MM format',
  }),
});

export const updateAppointmentSchema = createAppointmentSchema.partial();
