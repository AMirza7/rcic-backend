// src/schemas/auditLogSchemas.ts
import { z } from 'zod';

export const auditLogCreateSchema = z.object({
  userId:    z.string().uuid().optional(),
  action:    z.string(),
  entity:    z.string(),
  entityId:  z.string().uuid().optional(),
  before:    z.record(z.string(), z.any()).optional(),
  after:     z.record(z.string(), z.any()).optional(),
  metadata:  z.record(z.string(), z.any()).optional(),
  timestamp: z.preprocess(v => new Date(v as string), z.date()).optional(),
});

export const auditLogUpdateSchema = auditLogCreateSchema.partial();
