// src/schemas/userLanguageSchema.ts
import { z } from 'zod';
export const createUserLanguageSchema = z.object({
  userId: z.string().uuid(),
  language: z.enum(['EN','FR','HI'])
});
export const updateUserLanguageSchema = createUserLanguageSchema.partial();
