// src/controllers/appointmentController.ts
import { Request, Response } from 'express';
import { Appointment } from '../models/appointment';
import { notificationService } from '../services/notificationService';  // <-- updated

export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.findAll();
    return res.json(appointments);
  } catch (error) {
    console.error('getAllAppointments error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const appt = await Appointment.findByPk(id);
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    return res.json(appt);
  } catch (error) {
    console.error('getAppointmentById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newAppt = await Appointment.create(payload);

    // send confirmation email
    await notificationService.sendEmail({
      to: payload.clientEmail,
      subject: `Appointment confirmed for ${payload.date}`,
      text: `Your appointment on ${payload.date} at ${payload.time} is confirmed.`,
    });

    return res.status(201).json(newAppt);
  } catch (error) {
    console.error('createAppointment error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const appt = await Appointment.findByPk(id);
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    await appt.update(payload);
    return res.json(appt);
  } catch (error) {
    console.error('updateAppointment error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Appointment.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Appointment not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deleteAppointment error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
