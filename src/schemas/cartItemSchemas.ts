// src/schemas/cartItemSchemas.ts
import { z } from 'zod';

export const createCartItemSchema = z.object({
  templateId: z
    .string()
    .uuid({ message: 'templateId must be a valid UUID' }),
  price: z
    .number()
    .positive({ message: 'price must be greater than zero' }),
  currency: z
    .string()
    .nonempty({ message: 'currency is required' }),
  quantity: z
    .number()
    .int({ message: 'quantity must be an integer' })
    .positive({ message: 'quantity must be greater than zero' })
    .optional(),
  expiresAt: z
    .string()
    .optional()
    .refine((val) => val === undefined || !isNaN(Date.parse(val)), {
      message: 'expiresAt must be a valid ISO date string',
    }),
});

export const updateCartItemSchema = createCartItemSchema.partial();
