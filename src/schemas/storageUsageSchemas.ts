// src/schemas/storageUsageSchemas.ts
import { z } from 'zod';

export const updateStorageUsageSchema = z.object({
  totalUsed: z.number().nonnegative({ message: 'totalUsed must be ≥ 0' }).optional(),
  totalLimit: z.number().nonnegative({ message: 'totalLimit must be ≥ 0' }).optional(),
  usagePercentage: z
    .number()
    .min(0, { message: 'usagePercentage must be ≥ 0' })
    .max(100, { message: 'usagePercentage must be ≤ 100' })
    .optional(),
  breakdown: z
    .object({
      documents: z.number().nonnegative(),
      images: z.number().nonnegative(),
      templates: z.number().nonnegative(),
      backups: z.number().nonnegative(),
      other: z.number().nonnegative(),
    })
    .optional(),
  lastUpdated: z
    .string()
    .optional()
    .refine(
      (val) => val === undefined || !isNaN(Date.parse(val)),
      { message: 'lastUpdated must be a valid ISO date string' }
    ),
});
