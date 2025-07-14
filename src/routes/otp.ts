// src/routes/otp.ts
import { Router } from 'express';
import {
  getAllOtps,
  getOtpById,
  createOtp,
  updateOtp,
  deleteOtp,
} from '../controllers/otpController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createOtpSchema,
  updateOtpSchema,
} from '../schemas/otpSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllOtps);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getOtpById
);

router.post(
  '/',
  validateBody(createOtpSchema),
  createOtp
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateOtpSchema),
  updateOtp
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteOtp
);

export default router;
