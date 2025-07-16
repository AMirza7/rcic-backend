// src/routes/fileUploadConfigs.ts
import { Router } from 'express';
import {
  createFileUploadConfig,
  listFileUploadConfigs,
  getFileUploadConfig,
  updateFileUploadConfig,
  deleteFileUploadConfig
} from '../controllers/fileUploadConfigController';
import { requireAuth } from '../middleware/authMiddleware';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createFileUploadConfigSchema,
  updateFileUploadConfigSchema,
} from '../schemas/fileUploadConfigSchemas';

const router = Router();

// If your configs are per‑user or per‑consultant, you might have an :id param here.
// For global configs you can omit this. Example with optional :id:
const idParam = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

// POST /api/file-upload-configs
router.post(
  '/',
  requireAuth,
  validateBody(createFileUploadConfigSchema),
  createFileUploadConfig
);

// GET all
router.get(
  '/',
  requireAuth,
  listFileUploadConfigs
);

// GET single
router.get(
  '/:id',
  requireAuth,
  validateParams(idParam, 'params'),
  getFileUploadConfig
);

// PATCH /api/file-upload-configs/:id
router.patch(
  '/:id',
  requireAuth,
  validateParams(idParam, 'params'),
  validateBody(updateFileUploadConfigSchema),
  updateFileUploadConfig
);

// DELETE /api/file-upload-configs/:id
router.delete(
  '/:id',
  requireAuth,
  validateParams(idParam, 'params'),
  deleteFileUploadConfig
);

export default router;
