// src/schemas/conversationSchemas.ts
import { z } from 'zod';

export const createConversationSchema = z.object({
  title: z.string().optional(),
  participants: z.array(
    z.object({
      userId: z.string().uuid({ message: 'must be a valid UUID' }),
      role: z.enum(['client','consultant','employee','AI'])
    })
  )
}).strict();

export const updateConversationSchema = z.object({
  title: z.string().optional()
}).strict();

export const addParticipantSchema = z.object({
  userId: z.string().uuid({ message: 'must be a valid UUID' }),
  role: z.enum(['client','consultant','employee','AI'])
}).strict();
