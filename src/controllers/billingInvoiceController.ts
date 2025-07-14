// src/controllers/billingInvoiceController.ts
import { Request, Response } from 'express';
import { BillingInvoice } from '../models/billinginvoice';

export const getAllBillingInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await BillingInvoice.findAll();
    return res.json(invoices);
  } catch (error) {
    console.error('getAllBillingInvoices error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getBillingInvoiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const invoice = await BillingInvoice.findByPk(id);
    if (!invoice) return res.status(404).json({ message: 'BillingInvoice not found' });
    return res.json(invoice);
  } catch (error) {
    console.error('getBillingInvoiceById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createBillingInvoice = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newInvoice = await BillingInvoice.create(payload);
    return res.status(201).json(newInvoice);
  } catch (error) {
    console.error('createBillingInvoice error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateBillingInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const [updated] = await BillingInvoice.update(payload, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'BillingInvoice not found' });
    const updatedInvoice = await BillingInvoice.findByPk(id);
    return res.json(updatedInvoice);
  } catch (error) {
    console.error('updateBillingInvoice error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteBillingInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await BillingInvoice.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'BillingInvoice not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deleteBillingInvoice error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
