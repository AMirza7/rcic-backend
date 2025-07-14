// src/schemas/employeeSchemas.ts
import { z } from 'zod';

export const createEmployeeSchema = z.object({
  firstName:    z.string().min(1, { message: 'firstName is required' }),
  lastName:     z.string().min(1, { message: 'lastName is required' }),
  email:        z.string().email({ message: 'email must be valid' }),
  phone:        z.string()
                   .optional()
                   .refine((val) => !val || /^\+?[0-9]{7,15}$/.test(val), {
                     message: 'phone must be a valid number (7–15 digits, optional +)',
                   }),
  position:     z.string().optional(),
  consultantId: z.string().uuid({ message: 'consultantId must be a valid UUID' }),
  // add other Employee model fields here
});

export const updateEmployeeSchema = createEmployeeSchema.partial();
