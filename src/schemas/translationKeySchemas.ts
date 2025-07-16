// src/schemas/translationKeySchemas.ts
import { z } from 'zod';

/**
 * Validate body for creating a translation key
 */
export const createTranslationKeySchema = z.object({
  locale: z
    .string()
    .trim()
    .nonempty({ message: 'locale is required' }),
  key: z
    .string()
    .trim()
    .nonempty({ message: 'key is required' }),
  value: z
    .string()
    .trim()
    .nonempty({ message: 'value is required' }),
});

/**
 * For PATCH /api/translation‑keys/:id
 * any subset of the create schema is allowed
 */
export const updateTranslationKeySchema = createTranslationKeySchema.partial();

/**
 * For GET /api/translation‑keys?locale=…
 * optional, but if present must be non‑empty
 */
export const listTranslationKeysSchema = z.object({
  locale: z
    .string()
    .trim()
    .nonempty({ message: 'locale cannot be empty' })
    .optional(),
});
