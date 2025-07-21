// src/schemas/paginationSchemas.ts
import { z } from 'zod';

export const paginationSchema = z.object({
  page:  z.string().transform((val) => parseInt(val, 10)).optional(),
  limit: z.string().transform((val) => parseInt(val, 10)).optional(),
});
