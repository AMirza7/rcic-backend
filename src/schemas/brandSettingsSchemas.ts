// src/schemas/brandingSettingsSchemas.ts
import { z } from 'zod';

export const createBrandingSettingsSchema = z.object({
  tenantId:      z.string().uuid({ message: 'tenantId must be a valid UUID' }),
  logoUrl:       z.string().url({ message: 'logoUrl must be a valid URL' }).optional(),
  primaryColor:  z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, { message: 'primaryColor must be a valid hex code' }).optional(),
  secondaryColor:z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, { message: 'secondaryColor must be a valid hex code' }).optional(),
  // any other branding fields…
});

export const updateBrandingSettingsSchema = createBrandingSettingsSchema.partial();
