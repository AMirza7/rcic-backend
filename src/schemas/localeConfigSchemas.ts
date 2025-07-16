// src/schemas/localeConfigSchemas.ts
import { z } from 'zod';

const TWO_LETTER = (field: string) =>
  z.string().length(2, { message: `${field} must be a 2‑letter code` });

const NONEMPTY = (field: string) =>
  z.string().nonempty({ message: `${field} is required` });

export const createLocaleConfigSchema = z.object({
  code:       TWO_LETTER('code'),
  name:       NONEMPTY('name'),
  nativeName: NONEMPTY('nativeName'),
  flag:       NONEMPTY('flag'),
  rtl:        z.boolean(),
  dateFormat: NONEMPTY('dateFormat'),
  timeFormat: NONEMPTY('timeFormat'),

  currencyFormat: z.object({
    symbol:   NONEMPTY('symbol'),
    // <<< use the string‑only overload here
    position: z.enum(['before', 'after'] as const, 'position is required'),
    decimal:  NONEMPTY('decimal separator'),
    thousands:NONEMPTY('thousands separator'),
  }),

  numberFormat: z.object({
    decimal:   NONEMPTY('decimal separator'),
    thousands: NONEMPTY('thousands separator'),
  }),
});

export const updateLocaleConfigSchema =
  createLocaleConfigSchema.partial();
