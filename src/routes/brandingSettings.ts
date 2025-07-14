// src/routes/brandingSettings.ts
import { Router } from 'express';
import {
  getAllBrandingSettings,
  getBrandingSettingsById,
  createBrandingSettings,
  updateBrandingSettings,
  deleteBrandingSettings,
} from '../controllers/brandingSettingsController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createBrandingSettingsSchema,
  updateBrandingSettingsSchema,
} from '../schemas/brandSettingsSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

// GET   /branding-settings
router.get('/', getAllBrandingSettings);

// GET   /branding-settings/:id
router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getBrandingSettingsById
);

// POST  /branding-settings
router.post(
  '/',
  validateBody(createBrandingSettingsSchema),
  createBrandingSettings
);

// PUT   /branding-settings/:id
router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateBrandingSettingsSchema),
  updateBrandingSettings
);

// DELETE /branding-settings/:id
router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteBrandingSettings
);

export default router;
