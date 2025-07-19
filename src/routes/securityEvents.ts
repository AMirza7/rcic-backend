import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validate';
import { securityEventCreateSchema, securityEventUpdateSchema } from '../schemas/securityEventSchemas';
import {
  createSecurityEvent,
  getSecurityEvent,
  listSecurityEvents,
  updateSecurityEvent,
  deleteSecurityEvent
} from '../controllers/securityEventController';

const router = Router();
router.use(requireAuth);

router.post('/', validateBody(securityEventCreateSchema), createSecurityEvent);
router.get('/', listSecurityEvents);
router.get('/:id', getSecurityEvent);
router.put('/:id', validateBody(securityEventUpdateSchema), updateSecurityEvent);
router.delete('/:id', deleteSecurityEvent);

export default router;
