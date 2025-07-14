// src/schemas/otpSchemas.ts
import { z } from 'zod';

export const createOtpSchema = z.object({
  userId:    z.string().uuid({ message: 'userId must be a valid UUID' }),
  code:      z.string().length(6, { message: 'code must be 6 characters' }),
  expiresAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
                message: 'expiresAt must be a valid ISO date string',
              }),
});

export const updateOtpSchema = createOtpSchema.partial();
