import { Router } from 'express';
import {
  createLocaleConfig,
  listLocaleConfigs,
  getLocaleConfig,
  updateLocaleConfig,
  deleteLocaleConfig
} from '../controllers/localeConfigController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.post('/', requireAuth, createLocaleConfig);
router.get('/', requireAuth, listLocaleConfigs);
router.get('/:id', requireAuth, getLocaleConfig);
router.patch('/:id', requireAuth, updateLocaleConfig);
router.delete('/:id', requireAuth, deleteLocaleConfig);

export default router;
