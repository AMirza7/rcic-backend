import { z } from 'zod';

export const withdrawalCreateSchema = z.object({
  userId: z.string().uuid(),
  userType: z.enum(['client', 'consultant']),
  amount: z.number().positive(),
  status: z.enum(['requested', 'processing', 'paid', 'rejected']).optional(),
  requestedAt: z.preprocess((v) => new Date(v as string), z.date()),
  processedAt: z.preprocess((v) => new Date(v as string), z.date()).optional(),
  processedBy: z.string().uuid().optional(),
  paymentMethod: z.enum(['bank_transfer', 'paypal', 'check']).optional(),
  notes: z.string().optional(),
  rejectionReason: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const withdrawalUpdateSchema = withdrawalCreateSchema.partial();
