import { Router } from 'express';
import { listAuditLogs, getAuditLog } from '../controllers/auditLogController';
import { requireAuth, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.use(requireAuth, requireRole('admin'));
router.get('/', listAuditLogs);
router.get('/:id', getAuditLog);

export default router;
