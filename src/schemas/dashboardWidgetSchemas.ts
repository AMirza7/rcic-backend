import { z } from 'zod';

export const dashboardWidgetCreateSchema = z.object({
  userId: z.string().uuid(),
  widgetType: z.string(),
  config: z.record(z.string(), z.any()).optional(),
  position: z.object({ x: z.number(), y: z.number() }),
  size: z.object({ width: z.number(), height: z.number() }),
  metadata: z.record(z.string(), z.any()).optional(),
});

export const dashboardWidgetUpdateSchema = dashboardWidgetCreateSchema.partial();
