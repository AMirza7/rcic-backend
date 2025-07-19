import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validate';
import { withdrawalCreateSchema, withdrawalUpdateSchema } from '../schemas/withdrawalSchemas';
import {
  createWithdrawal,
  getWithdrawal,
  listWithdrawals,
  updateWithdrawal,
  deleteWithdrawal
} from '../controllers/withdrawalRequestController';

const router = Router();
router.use(requireAuth);

router.post('/', validateBody(withdrawalCreateSchema), createWithdrawal);
router.get('/', listWithdrawals);
router.get('/:id', getWithdrawal);
router.put('/:id', validateBody(withdrawalUpdateSchema), updateWithdrawal);
router.delete('/:id', deleteWithdrawal);

export default router;
