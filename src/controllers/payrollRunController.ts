// src/controllers/payrollRunController.ts
import { Request, Response } from 'express';
import { PayrollRun } from '../models/payrollrun';

export const getAllPayrollRuns = async (req: Request, res: Response) => {
  try {
    const runs = await PayrollRun.findAll();
    return res.json(runs);
  } catch (error) {
    console.error('getAllPayrollRuns error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPayrollRunById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const run = await PayrollRun.findByPk(id);
    if (!run) return res.status(404).json({ message: 'PayrollRun not found' });
    return res.json(run);
  } catch (error) {
    console.error('getPayrollRunById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createPayrollRun = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newRun = await PayrollRun.create(payload);
    return res.status(201).json(newRun);
  } catch (error) {
    console.error('createPayrollRun error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updatePayrollRun = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const [updated] = await PayrollRun.update(payload, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'PayrollRun not found' });
    const updatedRun = await PayrollRun.findByPk(id);
    return res.json(updatedRun);
  } catch (error) {
    console.error('updatePayrollRun error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deletePayrollRun = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await PayrollRun.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'PayrollRun not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deletePayrollRun error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
