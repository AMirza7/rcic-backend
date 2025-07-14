// src/schemas/authSchemas.ts
import { z } from 'zod';

export const registerSchema = z.object({
  email:        z.string().email({ message: 'email must be a valid email address' }),
  password:     z.string().min(8, { message: 'password must be at least 8 characters' }),
  mobileNumber: z.string().min(10, { message: 'mobileNumber is required' }),
  role:         z.string().min(1, { message: 'role is required' }),
});

export const loginSchema = z.object({
  email:    z.string().email({ message: 'email must be a valid email address' }),
  password: z.string().min(1, { message: 'password is required' }),
});
