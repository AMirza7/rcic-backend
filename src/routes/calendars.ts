import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validate';
import { calendarCreateSchema, calendarUpdateSchema } from '../schemas/calendarSchemas';
import {
  createCalendar,
  getCalendar,
  listCalendars,
  updateCalendar,
  deleteCalendar
} from '../controllers/calendarController';

const router = Router();
router.use(requireAuth);

router.post('/', validateBody(calendarCreateSchema), createCalendar);
router.get('/', listCalendars);
router.get('/:id', getCalendar);
router.put('/:id', validateBody(calendarUpdateSchema), updateCalendar);
router.delete('/:id', deleteCalendar);

export default router;
