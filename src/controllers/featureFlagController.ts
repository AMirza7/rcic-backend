// src/controllers/featureFlagController.ts
import { Request, Response } from 'express';
import { FeatureFlag } from '../models/featureflag';

export const getAllFeatureFlags = async (_req: Request, res: Response) => {
  try {
    const flags = await FeatureFlag.findAll();
    return res.json(flags);
  } catch (error) {
    console.error('getAllFeatureFlags error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getFeatureFlagByKey = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const flag = await FeatureFlag.findByPk(key);
    if (!flag) {
      return res.status(404).json({ message: 'FeatureFlag not found' });
    }
    return res.json(flag);
  } catch (error) {
    console.error('getFeatureFlagByKey error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createFeatureFlag = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newFlag = await FeatureFlag.create(payload);
    return res.status(201).json(newFlag);
  } catch (error) {
    console.error('createFeatureFlag error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateFeatureFlag = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const payload = req.body;
    const [updatedCount] = await FeatureFlag.update(payload, {
      where: { key },
    });
    if (updatedCount === 0) {
      return res.status(404).json({ message: 'FeatureFlag not found' });
    }
    const updatedFlag = await FeatureFlag.findByPk(key);
    return res.json(updatedFlag);
  } catch (error) {
    console.error('updateFeatureFlag error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteFeatureFlag = async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const deletedCount = await FeatureFlag.destroy({
      where: { key },
    });
    if (deletedCount === 0) {
      return res.status(404).json({ message: 'FeatureFlag not found' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('deleteFeatureFlag error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
