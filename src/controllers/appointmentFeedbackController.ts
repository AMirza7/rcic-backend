// src/controllers/appointmentFeedbackController.ts
import { Request, Response } from 'express';
import { AppointmentFeedback } from '../models/appointmentfeedback';

export const getAllAppointmentFeedback = async (req: Request, res: Response) => {
  try {
    const feedbacks = await AppointmentFeedback.findAll();
    return res.json(feedbacks);
  } catch (error) {
    console.error('getAllAppointmentFeedback error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAppointmentFeedbackById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const fb = await AppointmentFeedback.findByPk(id);
    if (!fb) return res.status(404).json({ message: 'AppointmentFeedback not found' });
    return res.json(fb);
  } catch (error) {
    console.error('getAppointmentFeedbackById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createAppointmentFeedback = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newFb = await AppointmentFeedback.create(payload);
    return res.status(201).json(newFb);
  } catch (error) {
    console.error('createAppointmentFeedback error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateAppointmentFeedback = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const [updated] = await AppointmentFeedback.update(payload, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'AppointmentFeedback not found' });
    const updatedFb = await AppointmentFeedback.findByPk(id);
    return res.json(updatedFb);
  } catch (error) {
    console.error('updateAppointmentFeedback error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteAppointmentFeedback = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await AppointmentFeedback.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'AppointmentFeedback not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deleteAppointmentFeedback error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
