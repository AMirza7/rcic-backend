// src/schemas/payrollRunSchemas.ts
import { z } from 'zod';

export const createPayrollRunSchema = z.object({
  runDate:       z.string().refine((val) => !isNaN(Date.parse(val)), {
                   message: 'runDate must be a valid ISO date string',
                 }),
  description:   z.string().optional(),
  processedBy:   z.string().uuid({ message: 'processedBy must be a valid UUID' }),
  // add other PayrollRun model fields here
});

export const updatePayrollRunSchema = createPayrollRunSchema.partial();
