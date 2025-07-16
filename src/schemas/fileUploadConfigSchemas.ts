// src/schemas/fileUploadConfigSchemas.ts
import { z } from 'zod';

export const createFileUploadConfigSchema = z.object({
  maxFileSize: z
    .number()
    .int({ message: 'maxFileSize must be an integer' })
    .nonnegative({ message: 'maxFileSize must be ≥ 0' }),
  allowedTypes: z
    .array(z.string().nonempty({ message: 'must be a non‑empty string' }))
    .nonempty({ message: 'allowedTypes must be a non‑empty array' }),
  uploadUrl: z
    .string()
    .url({ message: 'uploadUrl must be a valid URL' }),
  compressionEnabled: z
    .boolean(),
  virusScanning: z
    .boolean(),
  retentionPeriod: z
    .number()
    .int({ message: 'retentionPeriod must be an integer' })
    .positive({ message: 'retentionPeriod must be > 0' }),
});

export const updateFileUploadConfigSchema = createFileUploadConfigSchema.partial();
