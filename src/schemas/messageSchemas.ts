// src/schemas/messageSchemas.ts
import { z } from 'zod';

export const createMessageSchema = z.object({
  senderId:    z.string().uuid({ message: 'senderId must be a valid UUID' }),
  recipientId: z.string().uuid({ message: 'recipientId must be a valid UUID' }),
  content:     z.string().min(1, { message: 'content is required' }),
  timestamp:   z.string().refine((val) => !isNaN(Date.parse(val)), {
                  message: 'timestamp must be a valid ISO date string',
               }),
});

export const updateMessageSchema = createMessageSchema.partial();
