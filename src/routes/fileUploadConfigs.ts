import { Router } from 'express';
import {
  createFileUploadConfig,
  listFileUploadConfigs,
  getFileUploadConfig,
  updateFileUploadConfig,
  deleteFileUploadConfig
} from '../controllers/fileUploadConfigController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.post('/', requireAuth, createFileUploadConfig);
router.get('/', requireAuth, listFileUploadConfigs);
router.get('/:id', requireAuth, getFileUploadConfig);
router.patch('/:id', requireAuth, updateFileUploadConfig);
router.delete('/:id', requireAuth, deleteFileUploadConfig);

export default router;
