// src/routes/employee.ts
import { Router } from 'express';
import {
  listEmployees,
  getEmployee,
  addEmployee,
  editEmployee,
  removeEmployee,
} from '../controllers/employeeController';
import { requireAuth } from '../middleware/authMiddleware';
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

// GET /api/employees
router.get('/', requireAuth, listEmployees);

// GET /api/employees/:id
router.get(
  '/:id',
  requireAuth,
  validateParams(idParamSchema, 'params'),
  getEmployee
);

// POST /api/employees
router.post(
  '/',
  requireAuth,
  validateBody(createEmployeeSchema),
  addEmployee
);

// PUT /api/employees/:id
router.put(
  '/:id',
  requireAuth,
  validateParams(idParamSchema, 'params'),
  validateBody(updateEmployeeSchema),
  editEmployee
);

// DELETE /api/employees/:id
router.delete(
  '/:id',
  requireAuth,
  validateParams(idParamSchema, 'params'),
  removeEmployee
);

export default router;
