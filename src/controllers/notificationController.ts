// src/controllers/notificationController.ts
import { Request, Response } from 'express';
import { Notification } from '../models/notification';

export const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const notes = await Notification.findAll();
    return res.json(notes);
  } catch (error) {
    console.error('getAllNotifications error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getNotificationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await Notification.findByPk(id);
    if (!note) return res.status(404).json({ message: 'Notification not found' });
    return res.json(note);
  } catch (error) {
    console.error('getNotificationById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createNotification = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newNote = await Notification.create(payload);
    return res.status(201).json(newNote);
  } catch (error) {
    console.error('createNotification error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const [updated] = await Notification.update(payload, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'Notification not found' });
    const updatedNote = await Notification.findByPk(id);
    return res.json(updatedNote);
  } catch (error) {
    console.error('updateNotification error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Notification.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Notification not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deleteNotification error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
