// src/controllers/userSubscriptionController.ts
import { Request, Response } from 'express';
import { UserSubscription } from '../models/usersubscription';

export const getAllUserSubscriptions = async (req: Request, res: Response) => {
  try {
    const subs = await UserSubscription.findAll();
    return res.json(subs);
  } catch (error) {
    console.error('getAllUserSubscriptions error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserSubscriptionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const sub = await UserSubscription.findByPk(id);
    if (!sub) return res.status(404).json({ message: 'UserSubscription not found' });
    return res.json(sub);
  } catch (error) {
    console.error('getUserSubscriptionById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createUserSubscription = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newSub = await UserSubscription.create(payload);
    return res.status(201).json(newSub);
  } catch (error) {
    console.error('createUserSubscription error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUserSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const [updated] = await UserSubscription.update(payload, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'UserSubscription not found' });
    const updatedSub = await UserSubscription.findByPk(id);
    return res.json(updatedSub);
  } catch (error) {
    console.error('updateUserSubscription error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteUserSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await UserSubscription.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'UserSubscription not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deleteUserSubscription error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
