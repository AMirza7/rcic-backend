import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validate';
import { timesheetCreateSchema, timesheetUpdateSchema } from '../schemas/timesheetSchemas';
import {
  createTimesheet,
  getTimesheet,
  listTimesheets,
  updateTimesheet,
  deleteTimesheet
} from '../controllers/timesheetController';

const router = Router();
router.use(requireAuth);

router.post('/', validateBody(timesheetCreateSchema), createTimesheet);
router.get('/', listTimesheets);
router.get('/:id', getTimesheet);
router.put('/:id', validateBody(timesheetUpdateSchema), updateTimesheet);
router.delete('/:id', deleteTimesheet);

export default router;
