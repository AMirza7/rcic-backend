// src/routes/employee.ts
import { Router } from 'express';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employeeController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from '../schemas/employeeSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllEmployees);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getEmployeeById
);

router.post(
  '/',
  validateBody(createEmployeeSchema),
  createEmployee
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateEmployeeSchema),
  updateEmployee
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteEmployee
);

export default router;
