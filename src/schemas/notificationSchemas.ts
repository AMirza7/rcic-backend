// src/schemas/notificationSchemas.ts
import { z } from 'zod';

export const createNotificationSchema = z.object({
  userId:    z.string().uuid({ message: 'userId must be a valid UUID' }),
  title:     z.string().min(1, { message: 'title is required' }),
  message:   z.string().min(1, { message: 'message is required' }),
  read:      z.boolean().optional(),
  sentAt:    z.string()
               .refine((val) => !isNaN(Date.parse(val)), { message: 'sentAt must be a valid ISO date string' })
               .optional(),
});

export const updateNotificationSchema = createNotificationSchema.partial();
