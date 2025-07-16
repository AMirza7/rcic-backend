import { Router } from 'express';
import {
  getStorageUsage,
  updateStorageUsage
} from '../controllers/storageUsageController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.get('/:userId', requireAuth, getStorageUsage);
router.patch('/:userId', requireAuth, updateStorageUsage);

export default router;
