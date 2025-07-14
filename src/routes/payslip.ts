// src/routes/payslip.ts
import { Router } from 'express';
import {
  getAllPayslips,
  getPayslipById,
  createPayslip,
  updatePayslip,
  deletePayslip,
} from '../controllers/payslipController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createPayslipSchema,
  updatePayslipSchema,
} from '../schemas/payslipSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllPayslips);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getPayslipById
);

router.post(
  '/',
  validateBody(createPayslipSchema),
  createPayslip
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updatePayslipSchema),
  updatePayslip
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deletePayslip
);

export default router;
