import { Request, Response } from 'express';
import { LocaleConfig } from '../models/localeconfig';

/**
 * POST /api/locale-configs
 */
export async function createLocaleConfig(req: Request, res: Response) {
  try {
    const cfg = await LocaleConfig.create(req.body);
    return res.status(201).json({ success: true, data: cfg });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * GET /api/locale-configs
 */
export async function listLocaleConfigs(req: Request, res: Response) {
  try {
    const items = await LocaleConfig.findAll();
    return res.json({ success: true, data: items });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * GET /api/locale-configs/:id
 */
export async function getLocaleConfig(req: Request, res: Response) {
  try {
    const item = await LocaleConfig.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true, data: item });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * PATCH /api/locale-configs/:id
 */
export async function updateLocaleConfig(req: Request, res: Response) {
  try {
    const item = await LocaleConfig.findByPk(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    await item.update(req.body);
    return res.json({ success: true, data: item });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * DELETE /api/locale-configs/:id
 */
export async function deleteLocaleConfig(req: Request, res: Response) {
  try {
    const deleted = await LocaleConfig.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true, message: 'Deleted' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
