import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validate';
import { auditLogCreateSchema, auditLogUpdateSchema } from '../schemas/auditLogSchemas';
import {
  createAuditLog,
  getAuditLog,
  listAuditLogs,
  updateAuditLog,
  deleteAuditLog
} from '../controllers/auditLogController';

const router = Router();
router.use(requireAuth);

router.post('/', validateBody(auditLogCreateSchema), createAuditLog);
router.get('/', listAuditLogs);
router.get('/:id', getAuditLog);
router.put('/:id', validateBody(auditLogUpdateSchema), updateAuditLog);
router.delete('/:id', deleteAuditLog);

export default router;
