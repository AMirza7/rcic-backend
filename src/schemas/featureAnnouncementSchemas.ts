// src/schemas/featureAnnouncementSchemas.ts
import { z } from 'zod';

export const createFeatureAnnouncementSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'title is required' }),

  message: z
    .string()
    .min(1, { message: 'message is required' }),

  isActive: z
    .boolean()
    .refine((v) => typeof v === 'boolean', { message: 'isActive is required' }),

  announcedAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'announcedAt must be a valid ISO date string',
    }),
});

export const updateFeatureAnnouncementSchema =
  createFeatureAnnouncementSchema.partial();
