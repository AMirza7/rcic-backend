import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validate';
import { referralCreateSchema, referralUpdateSchema } from '../schemas/referralSchemas';
import {
  createReferral,
  getReferral,
  listReferrals,
  updateReferral,
  deleteReferral
} from '../controllers/referralController';

const router = Router();
router.use(requireAuth);

router.post('/', validateBody(referralCreateSchema), createReferral);
router.get('/', listReferrals);
router.get('/:id', getReferral);
router.put('/:id', validateBody(referralUpdateSchema), updateReferral);
router.delete('/:id', deleteReferral);

export default router;
