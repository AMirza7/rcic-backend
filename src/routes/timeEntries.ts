import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validate';
import { timeEntryCreateSchema, timeEntryUpdateSchema } from '../schemas/timeEntrySchemas';
import {
  createTimeEntry,
  getTimeEntry,
  listTimeEntries,
  updateTimeEntry,
  deleteTimeEntry
} from '../controllers/timeEntryController';

const router = Router();
router.use(requireAuth);

router.post('/', validateBody(timeEntryCreateSchema), createTimeEntry);
router.get('/', listTimeEntries);
router.get('/:id', getTimeEntry);
router.put('/:id', validateBody(timeEntryUpdateSchema), updateTimeEntry);
router.delete('/:id', deleteTimeEntry);

export default router;
