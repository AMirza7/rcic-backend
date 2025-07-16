import { Router } from 'express';
import {
  createConnectionRequest,
  listConnectionRequests,
  getConnectionRequestById,
  updateConnectionRequestStatus,
  deleteConnectionRequest
} from '../controllers/connectionRequestController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

router.post('/', requireAuth, createConnectionRequest);
router.get('/', requireAuth, listConnectionRequests);
router.get('/:id', requireAuth, getConnectionRequestById);
router.patch('/:id', requireAuth, updateConnectionRequestStatus);
router.delete('/:id', requireAuth, deleteConnectionRequest);

export default router;
