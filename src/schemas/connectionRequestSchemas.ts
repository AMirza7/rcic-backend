// src/schemas/connectionRequestSchemas.ts
import { z } from 'zod';

export const createConnectionRequestSchema = z.object({
  consultantId: z
    .string()
    .uuid({ message: 'consultantId must be a valid UUID' }),
});

export const updateConnectionRequestSchema = z.object({
  status: z
    .enum(['pending', 'accepted', 'rejected'])
    .refine((val) => ['pending', 'accepted', 'rejected'].includes(val), {
      message: 'status must be one of pending, accepted, or rejected',
    }),
});
