import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validate';
import { calendarEventCreateSchema, calendarEventUpdateSchema } from '../schemas/calendarEventSchemas';
import {
  createCalendarEvent,
  getCalendarEvent,
  listCalendarEvents,
  updateCalendarEvent,
  deleteCalendarEvent
} from '../controllers/calendarEventController';

const router = Router();
router.use(requireAuth);

router.post('/', validateBody(calendarEventCreateSchema), createCalendarEvent);
router.get('/', listCalendarEvents);
router.get('/:id', getCalendarEvent);
router.put('/:id', validateBody(calendarEventUpdateSchema), updateCalendarEvent);
router.delete('/:id', deleteCalendarEvent);

export default router;
