// src/routes/consultant.ts
import { Router } from 'express';
import {
  getAllConsultants,
  getConsultantById,
  createConsultant,
  updateConsultant,
  deleteConsultant,
} from '../controllers/consultantController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createConsultantSchema,
  updateConsultantSchema,
} from '../schemas/consultantSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllConsultants);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getConsultantById
);

router.post(
  '/',
  validateBody(createConsultantSchema),
  createConsultant
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateConsultantSchema),
  updateConsultant
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteConsultant
);

export default router;
