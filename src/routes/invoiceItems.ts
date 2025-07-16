import { Router } from 'express';
import {
  createInvoiceItem,
  listInvoiceItems,
  getInvoiceItem,
  updateInvoiceItem,
  deleteInvoiceItem
} from '../controllers/invoiceItemController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router({ mergeParams: true });

router.post('/', requireAuth, createInvoiceItem);
router.get('/', requireAuth, listInvoiceItems);
router.get('/:id', requireAuth, getInvoiceItem);
router.patch('/:id', requireAuth, updateInvoiceItem);
router.delete('/:id', requireAuth, deleteInvoiceItem);

export default router;
