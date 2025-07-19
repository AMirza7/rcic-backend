import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validate';
import {
  dashboardWidgetCreateSchema,
  dashboardWidgetUpdateSchema
} from '../schemas/dashboardWidgetSchemas';
import {
  createWidget,
  getWidget,
  listWidgets,
  updateWidget,
  deleteWidget
} from '../controllers/dashboardWidgetController';

const router = Router();
router.use(requireAuth);

router.post('/', validateBody(dashboardWidgetCreateSchema), createWidget);
router.get('/', listWidgets);
router.get('/:id', getWidget);
router.put('/:id', validateBody(dashboardWidgetUpdateSchema), updateWidget);
router.delete('/:id', deleteWidget);

export default router;
