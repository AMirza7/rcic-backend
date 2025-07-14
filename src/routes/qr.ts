import { Router } from 'express';
import {
  generateQRCode,
  validateQRCode,
} from '../controllers/qrController';
import { requireAuth } from '../middleware/authMiddleware';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import { validateQrSchema } from '../schemas/qrSchemas';

const router = Router();

// GET /api/qr/:consultantId → create/store code + return QR image
const consultantIdParam = z.object({
  consultantId: z.string().uuid({ message: 'consultantId must be UUID' }),
});
router.get(
  '/:consultantId',
  requireAuth,
  validateParams(consultantIdParam, 'params'),
  generateQRCode
);

// POST /api/qr/validate → { connectorId, code }
router.post(
  '/validate',
  requireAuth,
  validateBody(validateQrSchema),
  validateQRCode
);

export default router;
