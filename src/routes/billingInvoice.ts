// src/routes/billingInvoice.ts
import { Router } from 'express';
import {
  getAllBillingInvoices,
  getBillingInvoiceById,
  createBillingInvoice,
  updateBillingInvoice,
  deleteBillingInvoice,
} from '../controllers/billingInvoiceController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createBillingInvoiceSchema,
  updateBillingInvoiceSchema,
} from '../schemas/billingInvoiceSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllBillingInvoices);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getBillingInvoiceById
);

router.post(
  '/',
  validateBody(createBillingInvoiceSchema),
  createBillingInvoice
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateBillingInvoiceSchema),
  updateBillingInvoice
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteBillingInvoice
);

export default router;
