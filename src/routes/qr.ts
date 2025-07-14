// src/routes/qr.ts
import { Router } from 'express';
import { generateQRCode, linkClientToConsultant } from '../controllers/qrController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import { generateQrSchema, linkClientSchema } from '../schemas/qrSchemas';

const router = Router();

// UUID validation for :consultantId param
const consultantIdParamSchema = z.object({
  consultantId: z.string().uuid({ message: 'consultantId must be a valid UUID' }),
});

// GET /api/qr/:consultantId → returns { qrDataUrl }
router.get(
  '/:consultantId',
  validateParams(consultantIdParamSchema, 'params'),
  generateQRCode
);

// POST /api/qr/link → body: { consultantId, clientId }
router.post(
  '/link',
  validateBody(linkClientSchema),
  linkClientToConsultant
);

export default router;
