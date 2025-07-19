import { z } from 'zod';

export const timesheetCreateSchema = z.object({
  employeeId: z.string().uuid(),
  consultantId: z.string().uuid(),
  payPeriodStart: z.preprocess((v) => new Date(v as string), z.date()),
  payPeriodEnd:   z.preprocess((v) => new Date(v as string), z.date()),
  status: z.enum(['draft','submitted','approved','rejected','paid']).optional(),
  totalHours: z.object({
    regular: z.number(),
    overtime: z.number(),
    vacation: z.number(),
    sick: z.number(),
    holiday: z.number(),
    total: z.number()
  }),
  submittedAt: z.preprocess((v) => v ? new Date(v as string) : v, z.date()).optional(),
  submittedBy: z.string().uuid(),
  approvedAt:  z.preprocess((v) => v ? new Date(v as string) : v, z.date()).optional(),
  approvedBy:  z.string().uuid().optional(),
  rejectedAt:  z.preprocess((v) => v ? new Date(v as string) : v, z.date()).optional(),
  rejectionReason: z.string().optional(),
  notes: z.string().optional(),
  payrollProcessed: z.boolean().optional(),
  payrollRecordId: z.string().uuid().optional(),
  metadata: z.record(z.string(), z.any()).optional()
});

export const timesheetUpdateSchema = timesheetCreateSchema.partial();
