import { z } from 'zod';

export const timeEntryCreateSchema = z.object({
  timesheetId: z.string().uuid(),
  date:       z.preprocess((v) => new Date(v as string), z.date()),
  startTime:  z.string(),
  endTime:    z.string(),
  breakDuration: z.number(),
  hoursWorked:   z.number(),
  entryType: z.enum(['regular','overtime','vacation','sick','holiday','training']),
  taskDescription: z.string().optional(),
  clientId:  z.string().uuid().optional(),
  projectId: z.string().optional(),
  billable:  z.boolean(),
  hourlyRate: z.number().optional(),
  location: z.enum(['office','remote','client_site','other']),
  approved:  z.boolean(),
  notes:     z.string().optional(),
  gpsLocation: z
    .object({ latitude: z.number(), longitude: z.number(), accuracy: z.number() })
    .optional(),
  deviceInfo: z
    .object({ ip: z.string(), userAgent: z.string() })
    .optional()
});

export const timeEntryUpdateSchema = timeEntryCreateSchema.partial();
