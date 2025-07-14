// src/schemas/subscriptionPlanSchemas.ts
import { z } from 'zod';

export const createSubscriptionPlanSchema = z.object({
  name: z.string().min(1, { message: 'name is required' }),

  // must be a number > 0
  price: z.number().gt(0, { message: 'price must be greater than zero' }),

  // enum signature is (values, errorMessage)
  billingCycle: z.enum(['monthly', 'yearly'], 'billingCycle is required'),

  // optional list of feature strings
  features: z.array(z.string()).optional(),
});

export const updateSubscriptionPlanSchema = createSubscriptionPlanSchema.partial();
