import { Request, Response } from 'express';
import { FileUploadConfig } from '../models/fileuploadconfig';

/**
 * POST /api/file-upload-configs
 */
export async function createFileUploadConfig(req: Request, res: Response) {
  try {
    const config = await FileUploadConfig.create(req.body);
    return res.status(201).json({ success: true, data: config });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * GET /api/file-upload-configs
 */
export async function listFileUploadConfigs(req: Request, res: Response) {
  try {
    const configs = await FileUploadConfig.findAll();
    return res.json({ success: true, data: configs });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * GET /api/file-upload-configs/:id
 */
export async function getFileUploadConfig(req: Request, res: Response) {
  try {
    const config = await FileUploadConfig.findByPk(req.params.id);
    if (!config) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    return res.json({ success: true, data: config });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * PATCH /api/file-upload-configs/:id
 */
export async function updateFileUploadConfig(req: Request, res: Response) {
  try {
    const config = await FileUploadConfig.findByPk(req.params.id);
    if (!config) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    await config.update(req.body);
    return res.json({ success: true, data: config });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * DELETE /api/file-upload-configs/:id
 */
export async function deleteFileUploadConfig(req: Request, res: Response) {
  try {
    const deleted = await FileUploadConfig.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    return res.json({ success: true, message: 'Deleted' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
