// src/routes/payrollrun.ts
import { Router } from 'express';
import {
  getAllPayrollRuns,
  getPayrollRunById,
  createPayrollRun,
  updatePayrollRun,
  deletePayrollRun,
} from '../controllers/payrollRunController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createPayrollRunSchema,
  updatePayrollRunSchema,
} from '../schemas/payrollRunSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllPayrollRuns);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getPayrollRunById
);

router.post(
  '/',
  validateBody(createPayrollRunSchema),
  createPayrollRun
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updatePayrollRunSchema),
  updatePayrollRun
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deletePayrollRun
);

export default router;
