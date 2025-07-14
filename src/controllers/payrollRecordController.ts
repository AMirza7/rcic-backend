// src/controllers/payrollRecordController.ts
import { Request, Response } from 'express';
import { PayrollRecord } from '../models/payrollrecord';

export const getAllPayrollRecords = async (req: Request, res: Response) => {
  try {
    const records = await PayrollRecord.findAll();
    return res.json(records);
  } catch (error) {
    console.error('getAllPayrollRecords error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPayrollRecordById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const record = await PayrollRecord.findByPk(id);
    if (!record) return res.status(404).json({ message: 'PayrollRecord not found' });
    return res.json(record);
  } catch (error) {
    console.error('getPayrollRecordById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createPayrollRecord = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newRecord = await PayrollRecord.create(payload);
    return res.status(201).json(newRecord);
  } catch (error) {
    console.error('createPayrollRecord error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updatePayrollRecord = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const [updated] = await PayrollRecord.update(payload, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'PayrollRecord not found' });
    const updatedRecord = await PayrollRecord.findByPk(id);
    return res.json(updatedRecord);
  } catch (error) {
    console.error('updatePayrollRecord error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deletePayrollRecord = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await PayrollRecord.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'PayrollRecord not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deletePayrollRecord error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
