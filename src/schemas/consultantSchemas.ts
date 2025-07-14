// src/schemas/consultantSchemas.ts
import { z } from 'zod';

export const createConsultantSchema = z.object({
  name:  z.string().min(1, { message: 'name is required' }),
  email: z.string().email({ message: 'email must be valid' }),
  phone: z.string()
    .optional()
    .refine((val) => !val || /^\+?[0-9]{7,15}$/.test(val), {
      message: 'phone must be a valid number (7–15 digits, optional +)',
    }),
  specialization: z.string().optional(),
  bio:            z.string().optional(),
  // add any other Consultant model fields here
});

export const updateConsultantSchema = createConsultantSchema.partial();
