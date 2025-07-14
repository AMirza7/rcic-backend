// src/schemas/userSchemas.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  email:            z.string().email('email must be valid'),
  passwordHash:     z.string().min(60, 'passwordHash must be a bcrypt hash'),
  mobileNumber:     z.string().min(10, 'mobileNumber is required'),
  role:             z.enum(['admin','consultant','employee','client'], 'role is required'),
  isOnboarded:      z.boolean().optional(),
  consultantId:     z.string().uuid('consultantId must be a valid UUID').optional(),
});

export const updateUserSchema = createUserSchema.partial();
