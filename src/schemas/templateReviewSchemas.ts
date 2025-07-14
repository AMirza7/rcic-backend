// src/schemas/templateReviewSchemas.ts
import { z } from 'zod';

export const createTemplateReviewSchema = z.object({
  templateId: z.string().uuid({ message: 'templateId must be a valid UUID' }),
  reviewerId: z.string().uuid({ message: 'reviewerId must be a valid UUID' }),
  comments:   z.string().min(1, { message: 'comments are required' }),
  rating:     z.number().int().min(1).max(5, { message: 'rating must be between 1 and 5' }),
  reviewedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
                message: 'reviewedAt must be a valid ISO date string',
              }),
});

export const updateTemplateReviewSchema = createTemplateReviewSchema.partial();
