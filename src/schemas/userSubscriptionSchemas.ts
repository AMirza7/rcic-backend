// src/schemas/userSubscriptionSchemas.ts
import { z } from 'zod';

export const createUserSubscriptionSchema = z.object({
  userId:             z.string().uuid('userId must be a valid UUID'),
  subscriptionPlanId: z.string().uuid('subscriptionPlanId must be a valid UUID'),
  startDate:          z.string().refine(
                        (val) => !isNaN(Date.parse(val)),
                        { message: 'startDate must be a valid ISO date string' }
                      ),
  endDate:            z
                        .string()
                        .refine(
                          (val) => !isNaN(Date.parse(val)),
                          { message: 'endDate must be a valid ISO date string' }
                        )
                        .optional(),
  status:             z.enum(
                        ['active', 'paused', 'cancelled'],
                        'status is required'
                      ),
});

export const updateUserSubscriptionSchema = createUserSubscriptionSchema.partial();
