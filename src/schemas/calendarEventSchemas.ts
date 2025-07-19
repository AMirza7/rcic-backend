import { z } from 'zod';

export const calendarEventCreateSchema = z.object({
  calendarId:  z.string().uuid(),
  title:       z.string(),
  description: z.string().optional(),
  startTime:   z.preprocess(v => new Date(v as string), z.date()),
  endTime:     z.preprocess(v => new Date(v as string), z.date()),
  allDay:      z.boolean().optional(),
  location:    z.string().optional(),
  attendees:   z.array(z.string()).optional(),
  metadata:    z.record(z.string(), z.any()).optional()
});

export const calendarEventUpdateSchema = calendarEventCreateSchema.partial();
