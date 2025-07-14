// src/controllers/subscriptionPlanController.ts
import { Request, Response } from 'express';
import { SubscriptionPlan } from '../models/subscriptionplan';

export const getAllSubscriptionPlans = async (req: Request, res: Response) => {
  try {
    const plans = await SubscriptionPlan.findAll();
    return res.json(plans);
  } catch (error) {
    console.error('getAllSubscriptionPlans error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getSubscriptionPlanById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const plan = await SubscriptionPlan.findByPk(id);
    if (!plan) return res.status(404).json({ message: 'SubscriptionPlan not found' });
    return res.json(plan);
  } catch (error) {
    console.error('getSubscriptionPlanById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createSubscriptionPlan = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newPlan = await SubscriptionPlan.create(payload);
    return res.status(201).json(newPlan);
  } catch (error) {
    console.error('createSubscriptionPlan error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateSubscriptionPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const [updated] = await SubscriptionPlan.update(payload, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'SubscriptionPlan not found' });
    const updatedPlan = await SubscriptionPlan.findByPk(id);
    return res.json(updatedPlan);
  } catch (error) {
    console.error('updateSubscriptionPlan error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteSubscriptionPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await SubscriptionPlan.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'SubscriptionPlan not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deleteSubscriptionPlan error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
