// src/routes/payrollRecord.ts
import { Router } from 'express';
import {
  getAllPayrollRecords,
  getPayrollRecordById,
  createPayrollRecord,
  updatePayrollRecord,
  deletePayrollRecord,
} from '../controllers/payrollRecordController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createPayrollRecordSchema,
  updatePayrollRecordSchema,
} from '../schemas/payrollRecordSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllPayrollRecords);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getPayrollRecordById
);

router.post(
  '/',
  validateBody(createPayrollRecordSchema),
  createPayrollRecord
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updatePayrollRecordSchema),
  updatePayrollRecord
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deletePayrollRecord
);

export default router;
