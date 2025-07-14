// src/schemas/payrollRecordSchemas.ts
import { z } from 'zod';

export const createPayrollRecordSchema = z.object({
  employeeId:   z.string()
                   .uuid({ message: 'employeeId must be a valid UUID' }),
  payrollRunId: z.string()
                   .uuid({ message: 'payrollRunId must be a valid UUID' }),

  // must be a number and > 0
  hoursWorked:  z.number()
                   .gt(0, { message: 'hoursWorked must be greater than zero' }),
  hourlyRate:   z.number()
                   .gt(0, { message: 'hourlyRate must be greater than zero' }),

  grossPay:     z.number().optional(),
  deductions:   z.number().optional(),
  netPay:       z.number().optional(),

  // ISO-date check
  recordDate:   z.string()
                   .refine((val: string) => !isNaN(Date.parse(val)), {
                     message: 'recordDate must be a valid ISO date string',
                   }),
});

export const updatePayrollRecordSchema = createPayrollRecordSchema.partial();
