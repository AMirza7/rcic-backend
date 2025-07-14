// src/schemas/authTokenSchemas.ts
import { z } from 'zod';

export const createAuthTokenSchema = z.object({
  userId:    z.string().uuid({ message: 'userId must be a valid UUID' }),
  token:     z.string().min(1, { message: 'token is required' }),
  expiresAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
                message: 'expiresAt must be a valid ISO date string',
              }),
});

export const updateAuthTokenSchema = createAuthTokenSchema.partial();
