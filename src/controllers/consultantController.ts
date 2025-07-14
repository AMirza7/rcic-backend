// src/controllers/consultantController.ts
import { Request, Response } from 'express';
import { Consultant } from '../models/consultant';

export const getAllConsultants = async (req: Request, res: Response) => {
  try {
    const consultants = await Consultant.findAll();
    return res.json(consultants);
  } catch (error) {
    console.error('getAllConsultants error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getConsultantById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const consultant = await Consultant.findByPk(id);
    if (!consultant) return res.status(404).json({ message: 'Consultant not found' });
    return res.json(consultant);
  } catch (error) {
    console.error('getConsultantById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createConsultant = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newConsultant = await Consultant.create(payload);
    return res.status(201).json(newConsultant);
  } catch (error) {
    console.error('createConsultant error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateConsultant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const [updated] = await Consultant.update(payload, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'Consultant not found' });
    const updatedConsultant = await Consultant.findByPk(id);
    return res.json(updatedConsultant);
  } catch (error) {
    console.error('updateConsultant error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteConsultant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Consultant.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Consultant not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deleteConsultant error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
