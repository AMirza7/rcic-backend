// src/schemas/featureFlagSchemas.ts
import { z } from 'zod';

export const createFeatureFlagSchema = z.object({
  key: z
    .string()
    .min(1, { message: 'key is required' }),

  description: z
    .string()
    .optional(),

  isEnabled: z
    .boolean()
    .refine((v) => typeof v === 'boolean', { message: 'isEnabled is required' }),
});

export const updateFeatureFlagSchema = createFeatureFlagSchema.partial();
