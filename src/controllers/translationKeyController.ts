import { Request, Response } from 'express';
import { TranslationKey, TranslationKeyAttributes } from '../models/translationkey';

/**
 * POST /api/translation-keys
 */
export async function createTranslationKey(req: Request, res: Response) {
  try {
    const { locale, key, value } = req.body;
    const tk = await TranslationKey.create({ locale, key, value });
    return res.status(201).json({ success: true, data: tk });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * GET /api/translation-keys
 */
export async function listTranslationKeys(req: Request, res: Response) {
  try {
    // build a typed where object, defaulting to empty object
    const where: Partial<TranslationKeyAttributes> = {};
    if (req.query.locale) {
      where.locale = String(req.query.locale);
    }

    const items = await TranslationKey.findAll({ where });
    return res.json({ success: true, data: items });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * GET /api/translation-keys/:id
 */
export async function getTranslationKey(req: Request, res: Response) {
  try {
    const tk = await TranslationKey.findByPk(req.params.id);
    if (!tk) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true, data: tk });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * PATCH /api/translation-keys/:id
 */
export async function updateTranslationKey(req: Request, res: Response) {
  try {
    const tk = await TranslationKey.findByPk(req.params.id);
    if (!tk) return res.status(404).json({ success: false, message: 'Not found' });
    await tk.update(req.body);
    return res.json({ success: true, data: tk });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * DELETE /api/translation-keys/:id
 */
export async function deleteTranslationKey(req: Request, res: Response) {
  try {
    const deleted = await TranslationKey.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true, message: 'Deleted' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
