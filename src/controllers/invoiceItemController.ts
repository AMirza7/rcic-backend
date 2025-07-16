import { Request, Response } from 'express';
import { InvoiceItem } from '../models/invoiceitem';
import { BillingInvoice } from '../models/billinginvoice';

/**
 * POST /api/invoices/:invoiceId/items
 */
export async function createInvoiceItem(req: Request, res: Response) {
  try {
    const { invoiceId } = req.params;
    const { description, amount, quantity } = req.body;
    // ensure invoice exists
    const invoice = await BillingInvoice.findByPk(invoiceId);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    const item = await InvoiceItem.create({ invoiceId, description, amount, quantity });
    return res.status(201).json({ success: true, data: item });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * GET /api/invoices/:invoiceId/items
 */
export async function listInvoiceItems(req: Request, res: Response) {
  try {
    const { invoiceId } = req.params;
    const items = await InvoiceItem.findAll({ where: { invoiceId } });
    return res.json({ success: true, data: items });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * GET /api/invoices/:invoiceId/items/:id
 */
export async function getInvoiceItem(req: Request, res: Response) {
  try {
    const { invoiceId, id } = req.params;
    const item = await InvoiceItem.findOne({ where: { id, invoiceId } });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    return res.json({ success: true, data: item });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * PATCH /api/invoices/:invoiceId/items/:id
 */
export async function updateInvoiceItem(req: Request, res: Response) {
  try {
    const { invoiceId, id } = req.params;
    const updates = req.body;
    const item = await InvoiceItem.findOne({ where: { id, invoiceId } });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    await item.update(updates);
    return res.json({ success: true, data: item });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * DELETE /api/invoices/:invoiceId/items/:id
 */
export async function deleteInvoiceItem(req: Request, res: Response) {
  try {
    const { invoiceId, id } = req.params;
    const deleted = await InvoiceItem.destroy({ where: { id, invoiceId } });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    return res.json({ success: true, message: 'Deleted' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
