import { z } from 'zod';

export const createPayslipSchema = z.object({
  employeeId:   z.string()
                   .uuid({ message: 'employeeId must be a valid UUID' }),
  payrollRecordId: z.string()
                     .uuid({ message: 'payrollRecordId must be a valid UUID' }),

  periodStart:  z.string()
                   .refine((val: string) => !isNaN(Date.parse(val)), {
                     message: 'periodStart must be a valid ISO date string',
                   }),
  periodEnd:    z.string()
                   .refine((val: string) => !isNaN(Date.parse(val)), {
                     message: 'periodEnd must be a valid ISO date string',
                   }),

  // ensure grossPay/taxes/netPay are present and > 0
  grossPay:     z.number().gt(0, { message: 'grossPay must be greater than zero' }),
  taxes:        z.number().gte(0, { message: 'taxes must be >= 0' }),
  netPay:       z.number().gt(0, { message: 'netPay must be greater than zero' }),

  issuedAt:     z.string()
                   .refine((val: string) => !isNaN(Date.parse(val)), {
                     message: 'issuedAt must be a valid ISO date string',
                   }),
});

export const updatePayslipSchema = createPayslipSchema.partial();
