// src/schemas/documentSchemas.ts
import { z } from 'zod';

export const createDocumentSchema = z.object({
  originalName: z
    .string()
    .min(1, { message: 'originalName is required' }),

  fileName: z
    .string()
    .min(1, { message: 'fileName is required' }),

  mimeType: z
    .string()
    .min(1, { message: 'mimeType is required' }),

  // ensure it's a non-negative integer
  size: z
    .number()
    .int({ message: 'size must be an integer' })
    .nonnegative({ message: 'size must be non-negative' }),

  path: z
    .string()
    .min(1, { message: 'path is required' }),

  documentFolderId: z
    .string()
    .uuid({ message: 'documentFolderId must be a valid UUID' })
    .optional(),
});

export const updateDocumentSchema = createDocumentSchema.partial();
