// src/routes/invoiceItems.ts
import { Router } from 'express';
import {
  createInvoiceItem,
  listInvoiceItems,
  getInvoiceItem,
  updateInvoiceItem,
  deleteInvoiceItem
} from '../controllers/invoiceItemController';
import { requireAuth } from '../middleware/authMiddleware';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createInvoiceItemSchema,
  updateInvoiceItemSchema,
} from '../schemas/invoiceItemSchemas';

const router = Router({ mergeParams: true });

// UUID validation for :invoiceId and :id params
const invoiceIdParam = z.object({
  invoiceId: z.string().uuid({ message: 'invoiceId must be a valid UUID' })
});
const idParam = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' })
});

router.post(
  '/',
  requireAuth,
  validateParams(invoiceIdParam, 'params'),
  validateBody(createInvoiceItemSchema),
  createInvoiceItem
);

router.get(
  '/',
  requireAuth,
  validateParams(invoiceIdParam, 'params'),
  listInvoiceItems
);

router.get(
  '/:id',
  requireAuth,
  validateParams(idParam, 'params'),
  getInvoiceItem
);

router.patch(
  '/:id',
  requireAuth,
  validateParams(idParam, 'params'),
  validateBody(updateInvoiceItemSchema),
  updateInvoiceItem
);

router.delete(
  '/:id',
  requireAuth,
  validateParams(idParam, 'params'),
  deleteInvoiceItem
);

export default router;
