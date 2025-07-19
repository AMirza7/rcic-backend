import { z } from 'zod';

export const securityEventCreateSchema = z.object({
  userId:    z.string().uuid().optional(),
  eventType: z.string(),
  eventData: z.record(z.string(), z.any()).optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  riskScore: z.number().optional(),
  timestamp: z.preprocess(v => new Date(v as string), z.date()).optional()
});

export const securityEventUpdateSchema = securityEventCreateSchema.partial();
