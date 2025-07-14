// src/schemas/paymentSchemas.ts
import { z } from 'zod';

/** Any query-params you might add later */
export const listPaymentsSchema = z.object({});

/** Validate :id params */
export const getPaymentByIdSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

/** Payload when creating a PaymentIntent (amount > 0, currency non-empty) */
export const createPaymentIntentSchema = z.object({
  amount: z
    .number()
    .gt(0, { message: 'amount must be greater than zero' }),
  currency: z
    .string()
    .min(1, { message: 'currency is required' }),
  // … add other fields here as needed
});

/** Webhook payloads often have no fixed shape */
export const handlePaymentWebhookSchema = z.object({});

/** Updating a payment’s status */
export const updatePaymentSchema = z.object({
  status: z.enum(
    ['pending', 'succeeded', 'failed'] as const,
    'status must be one of pending, succeeded or failed'
  ),
});
