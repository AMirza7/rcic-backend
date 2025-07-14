// src/schemas/qrSchemas.ts
import { z } from 'zod';

export const generateQrSchema = z.object({
  consultantId: z.string().uuid({ message: 'consultantId must be a valid UUID' }),
});

export const linkClientSchema = z.object({
  consultantId: z.string().uuid({ message: 'consultantId must be a valid UUID' }),
  clientId:     z.string().uuid({ message: 'clientId must be a valid UUID' }),
});
