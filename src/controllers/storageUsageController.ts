import { Request, Response } from 'express';
import { StorageUsage } from '../models/storageusage';

/**
 * GET /api/storage-usage/:userId
 */
export async function getStorageUsage(req: Request, res: Response) {
  try {
    const userId = req.params.userId;
    const usage = await StorageUsage.findOne({ where: { userId } });
    if (!usage) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    return res.json({ success: true, data: usage });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * PATCH /api/storage-usage/:userId
 */
export async function updateStorageUsage(req: Request, res: Response) {
  try {
    const userId = req.params.userId;
    const updates = req.body; // e.g. { totalUsed, breakdown, lastUpdated }
    const usage = await StorageUsage.findOne({ where: { userId } });
    if (!usage) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    await usage.update(updates);
    return res.json({ success: true, data: usage });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
