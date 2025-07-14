import { Request, Response } from 'express';
import {Content} from '../models/content';

export const getAllContent = async (_req: Request, res: Response) => {
  try {
    const items = await Content.findAll();
    return res.json(items);
  } catch (err) {
    console.error('getAllContent error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getContentById = async (req: Request, res: Response) => {
  try {
    const key = req.params.id;        // <-- route param `:id` is your `key`
    const item = await Content.findByPk(key);
    if (!item) return res.status(404).json({ message: 'Content not found' });
    return res.json(item);
  } catch (err) {
    console.error('getContentById error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createContent = async (req: Request, res: Response) => {
  try {
    const payload = req.body as { key: string; value: string };
    const newItem = await Content.create(payload);
    return res.status(201).json(newItem);
  } catch (err) {
    console.error('createContent error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateContent = async (req: Request, res: Response) => {
  try {
    const key = req.params.id;
    const payload = req.body as { value?: string };
    const [updatedCount] = await Content.update(payload, { where: { key } });
    if (updatedCount === 0) {
      return res.status(404).json({ message: 'Content not found' });
    }
    const updated = await Content.findByPk(key);
    return res.json(updated);
  } catch (err) {
    console.error('updateContent error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  try {
    const key = req.params.id;
    const deletedCount = await Content.destroy({ where: { key } });
    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Content not found' });
    }
    return res.status(204).send();
  } catch (err) {
    console.error('deleteContent error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
