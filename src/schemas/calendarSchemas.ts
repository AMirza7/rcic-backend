import { z } from 'zod';

export const calendarCreateSchema = z.object({
  consultantId:   z.string().uuid(),
  name:           z.string(),
  description:    z.string().optional(),
  timezone:       z.string(),
  externalId:     z.string().optional(),
  syncEnabled:    z.boolean().optional(),
  syncSettings:   z.record(z.string(), z.any()).optional()
});

export const calendarUpdateSchema = calendarCreateSchema.partial();
