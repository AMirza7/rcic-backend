import { Router } from 'express';
import {
  createTranslationKey,
  listTranslationKeys,
  getTranslationKey,
  updateTranslationKey,
  deleteTranslationKey
} from '../controllers/translationKeyController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.post('/', requireAuth, createTranslationKey);
router.get('/', requireAuth, listTranslationKeys);
router.get('/:id', requireAuth, getTranslationKey);
router.patch('/:id', requireAuth, updateTranslationKey);
router.delete('/:id', requireAuth, deleteTranslationKey);

export default router;
