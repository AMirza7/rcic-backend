import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { validateBody } from '../middleware/validate';
import {
  integrationCreateSchema,
  integrationUpdateSchema
} from '../schemas/integrationSchemas';
import {
  createIntegration,
  getIntegration,
  listIntegrations,
  updateIntegration,
  deleteIntegration
} from '../controllers/integrationController';

const router = Router();
router.use(requireAuth);

router.post('/', validateBody(integrationCreateSchema), createIntegration);
router.get('/', listIntegrations);
router.get('/:id', getIntegration);
router.put('/:id', validateBody(integrationUpdateSchema), updateIntegration);
router.delete('/:id', deleteIntegration);

export default router;
