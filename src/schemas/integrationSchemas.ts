import { z } from 'zod';

export const integrationCreateSchema = z.object({
  userId: z.string().uuid(),
  provider: z.string(),
  credentials: z.record(z.string(), z.any()).optional(),
  enabled: z.boolean(),
  settings: z.record(z.string(), z.any()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const integrationUpdateSchema = integrationCreateSchema.partial();
