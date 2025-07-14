// src/routes/payment.ts
import { Router } from 'express';
import {
  listPayments,
  getPaymentById,
  createPaymentIntent,
  handlePaymentWebhook,
} from '../controllers/paymentController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  getPaymentByIdSchema,
  createPaymentIntentSchema,
  handlePaymentWebhookSchema,
} from '../schemas/paymentSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

// GET /api/payments
router.get('/', listPayments);

// GET /api/payments/:id
router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getPaymentById
);

// POST /api/payments/create-intent
router.post(
  '/create-intent',
  validateBody(createPaymentIntentSchema),
  createPaymentIntent
);

// POST /api/payments/webhook
router.post(
  '/webhook',
  validateBody(handlePaymentWebhookSchema),
  handlePaymentWebhook
);

export default router;
