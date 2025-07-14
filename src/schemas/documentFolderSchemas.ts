// src/schemas/documentFolderSchemas.ts
import { z } from 'zod';

export const createDocumentFolderSchema = z.object({
  name:        z.string().min(1, { message: 'name is required' }),
  description: z.string().optional(),
  parentId:    z.string().uuid({ message: 'parentId must be a valid UUID' }).optional(),
});

export const updateDocumentFolderSchema = createDocumentFolderSchema.partial();
