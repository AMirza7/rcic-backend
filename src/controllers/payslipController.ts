// src/controllers/payslipController.ts
import { Request, Response } from 'express';
import { Payslip } from '../models/payslip';

export const getAllPayslips = async (req: Request, res: Response) => {
  try {
    const slips = await Payslip.findAll();
    return res.json(slips);
  } catch (error) {
    console.error('getAllPayslips error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPayslipById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const slip = await Payslip.findByPk(id);
    if (!slip) return res.status(404).json({ message: 'Payslip not found' });
    return res.json(slip);
  } catch (error) {
    console.error('getPayslipById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createPayslip = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newSlip = await Payslip.create(payload);
    return res.status(201).json(newSlip);
  } catch (error) {
    console.error('createPayslip error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updatePayslip = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const [updated] = await Payslip.update(payload, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'Payslip not found' });
    const updatedSlip = await Payslip.findByPk(id);
    return res.json(updatedSlip);
  } catch (error) {
    console.error('updatePayslip error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deletePayslip = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Payslip.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Payslip not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deletePayslip error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
