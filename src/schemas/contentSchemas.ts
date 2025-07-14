// src/schemas/contentSchemas.ts
import { z } from 'zod';

export const createContentSchema = z.object({
  title:   z.string().min(1, { message: 'title is required' }),
  body:    z.string().min(1, { message: 'body is required' }),
  authorId:z.string().uuid({ message: 'authorId must be a valid UUID' }),
  publishedAt: z.string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: 'publishedAt must be a valid ISO date string',
    }),
});

export const updateContentSchema = createContentSchema.partial();
