// src/schemas/otpSchemas.ts
import { z } from 'zod';

/**
 * Schema for creating a new OTP.
 * Body must include:
 *   - userId:       UUID of the user
 *   - phoneNumber:  string of 7–15 digits, optional leading +
 *   - code:         exactly 6 numeric characters
 *   - expiresAt:    ISO date string
 */
export const createOtpSchema = z.object({
  userId: z
    .string()
    .uuid({ message: 'userId must be a valid UUID' }),
  phoneNumber: z
    .string()
    .min(7, { message: 'phoneNumber must be at least 7 digits' })
    .max(15, { message: 'phoneNumber must be at most 15 digits' })
    .regex(/^\+?[0-9]+$/, { message: 'phoneNumber must be numeric, optionally starting with +' }),
  code: z
    .string()
    .length(6, { message: 'code must be exactly 6 characters' })
    .regex(/^\d{6}$/, { message: 'code must be numeric' }),
  expiresAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'expiresAt must be a valid ISO date string',
    }),
});

/**
 * Schema for updating an existing OTP.
 * Allows any subset of the create schema.
 */
export const updateOtpSchema = createOtpSchema.partial();
