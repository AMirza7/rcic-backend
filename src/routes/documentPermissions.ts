import { Router } from 'express';
import {
  createDocumentPermission,
  listDocumentPermissions,
  getDocumentPermission,
  updateDocumentPermission,
  deleteDocumentPermission
} from '../controllers/documentPermissionController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.post('/', requireAuth, createDocumentPermission);
router.get('/', requireAuth, listDocumentPermissions);
router.get('/:id', requireAuth, getDocumentPermission);
router.patch('/:id', requireAuth, updateDocumentPermission);
router.delete('/:id', requireAuth, deleteDocumentPermission);

export default router;
