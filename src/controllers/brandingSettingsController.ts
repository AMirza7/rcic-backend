// src/controllers/brandingSettingsController.ts
import { Request, Response } from 'express';
import {
  BrandingSettings,
  BrandingSettingsCreationAttributes,
} from '../models/brandingsettings';

/**
 * GET /branding-settings
 */
export const getAllBrandingSettings = async (_req: Request, res: Response) => {
  try {
    const all = await BrandingSettings.findAll();
    return res.json(all);
  } catch (err) {
    console.error('getAllBrandingSettings error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * GET /branding-settings/:id
 */
export const getBrandingSettingsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const one = await BrandingSettings.findByPk(id);
    if (!one) {
      return res.status(404).json({ message: 'BrandingSettings not found' });
    }
    return res.json(one);
  } catch (err) {
    console.error('getBrandingSettingsById error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * POST /branding-settings
 */
export const createBrandingSettings = async (req: Request, res: Response) => {
  try {
    // req.body has already been validated against your Zod schema
    const payload = req.body as BrandingSettingsCreationAttributes;
    const created = await BrandingSettings.create(payload);
    return res.status(201).json(created);
  } catch (err) {
    console.error('createBrandingSettings error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * PUT /branding-settings/:id
 */
export const updateBrandingSettings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body as Partial<BrandingSettingsCreationAttributes>;
    const [count] = await BrandingSettings.update(updates, { where: { id } });
    if (count === 0) {
      return res.status(404).json({ message: 'BrandingSettings not found' });
    }
    const updated = await BrandingSettings.findByPk(id);
    return res.json(updated);
  } catch (err) {
    console.error('updateBrandingSettings error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * DELETE /branding-settings/:id
 */
export const deleteBrandingSettings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const count = await BrandingSettings.destroy({ where: { id } });
    if (count === 0) {
      return res.status(404).json({ message: 'BrandingSettings not found' });
    }
    return res.status(204).send();
  } catch (err) {
    console.error('deleteBrandingSettings error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
