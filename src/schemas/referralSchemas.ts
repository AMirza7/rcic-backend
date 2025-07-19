import { z } from 'zod';

export const referralCreateSchema = z.object({
  referrerId: z.string().uuid(),
  referrerType: z.enum(['client', 'consultant']),
  referralCode: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  phone: z.string().optional(),
  invitedAt: z.preprocess((v) => new Date(v as string), z.date()),
  status: z.enum(['pending', 'signed_up', 'reward_claimed']).optional(),
  planSubscribed: z.string().optional(),
  rewardAmount: z.number().optional(),
  rewardStatus: z.enum(['pending', 'paid', 'cancelled']).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const referralUpdateSchema = referralCreateSchema.partial();
