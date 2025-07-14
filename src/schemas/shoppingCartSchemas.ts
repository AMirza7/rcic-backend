// src/schemas/shoppingCartSchemas.ts
import { z } from 'zod';

export const createShoppingCartSchema = z.object({
  userId: z.string().uuid({ message: 'userId must be a valid UUID' }),

  items: z
    .array(
      z.object({
        productId: z.string().uuid({ message: 'productId must be a valid UUID' }),
        quantity: z.number().int().min(1, { message: 'quantity must be at least 1' }),
      })
    )
    .nonempty({ message: 'items array must contain at least one item' }),

  status: z.enum(['open', 'completed', 'cancelled'], 'status is required'),

  // these can be passed in or generated server-side:
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const updateShoppingCartSchema = createShoppingCartSchema.partial();
