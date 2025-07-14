// src/schemas/billingInvoiceSchemas.ts
import { z } from 'zod';

export const createBillingInvoiceSchema = z.object({
  clientId: z
    .string()
    .uuid({ message: 'clientId must be a valid UUID' }),

  // must be > 0
  amount: z
    .number()
    .positive({ message: 'amount must be greater than zero' }),

  // non-empty currency
  currency: z
    .string()
    .nonempty({ message: 'currency is required' }),

  // one of these three values
  status: z
    .enum(['paid', 'unpaid', 'pending'])
    .refine((val) => ['paid','unpaid','pending'].includes(val), {
      message: 'status must be one of paid, unpaid or pending',
    }),

  // must be valid ISO date
  issuedAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'issuedAt must be a valid ISO date string',
    }),

  // optional, but if present must be valid ISO date
  paidAt: z
    .string()
    .optional()
    .refine((val) => val === undefined || !isNaN(Date.parse(val)), {
      message: 'paidAt must be a valid ISO date string',
    }),
});

export const updateBillingInvoiceSchema = createBillingInvoiceSchema.partial();
