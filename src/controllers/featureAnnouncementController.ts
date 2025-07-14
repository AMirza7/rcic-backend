// src/controllers/featureAnnouncementController.ts
import { Request, Response } from 'express';
import { FeatureAnnouncement } from '../models/featureannouncement';

export const getAllFeatureAnnouncements = async (req: Request, res: Response) => {
  try {
    const announcements = await FeatureAnnouncement.findAll();
    return res.json(announcements);
  } catch (error) {
    console.error('getAllFeatureAnnouncements error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getFeatureAnnouncementById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const announcement = await FeatureAnnouncement.findByPk(id);
    if (!announcement) return res.status(404).json({ message: 'FeatureAnnouncement not found' });
    return res.json(announcement);
  } catch (error) {
    console.error('getFeatureAnnouncementById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createFeatureAnnouncement = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newAnnouncement = await FeatureAnnouncement.create(payload);
    return res.status(201).json(newAnnouncement);
  } catch (error) {
    console.error('createFeatureAnnouncement error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateFeatureAnnouncement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const [updated] = await FeatureAnnouncement.update(payload, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'FeatureAnnouncement not found' });
    const updatedAnnouncement = await FeatureAnnouncement.findByPk(id);
    return res.json(updatedAnnouncement);
  } catch (error) {
    console.error('updateFeatureAnnouncement error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteFeatureAnnouncement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await FeatureAnnouncement.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'FeatureAnnouncement not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deleteFeatureAnnouncement error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
