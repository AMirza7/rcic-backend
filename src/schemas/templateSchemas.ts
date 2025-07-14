// src/schemas/templateSchemas.ts
import { z } from 'zod';

export const createTemplateSchema = z.object({
  name:        z.string().min(1, { message: 'name is required' }),
  description: z.string().optional(),
  content:     z.string().min(1, { message: 'content is required' }),
  version:     z.string().optional(),
});

export const updateTemplateSchema = createTemplateSchema.partial();
