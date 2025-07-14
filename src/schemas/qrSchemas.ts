import { z } from 'zod';

/** No body for GET; we rely on req.user.id + params if you choose */
export const generateQrSchema = z.object({});

/** For POST /api/qr/validate */
export const validateQrSchema = z.object({
  connectorId: z.string().uuid({ message: 'Must be a valid UUID' }),
  code: z
    .string()
    .length(6, { message: 'Code must be exactly 6 digits' })
    .regex(/^\d+$/, { message: 'Code must be numeric' }),
});
