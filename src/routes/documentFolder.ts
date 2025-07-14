// src/routes/documentFolder.ts
import { Router } from 'express';
import {
  getAllDocumentFolders,
  getDocumentFolderById,
  createDocumentFolder,
  updateDocumentFolder,
  deleteDocumentFolder,
} from '../controllers/documentFolderController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createDocumentFolderSchema,
  updateDocumentFolderSchema,
} from '../schemas/documentFolderSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllDocumentFolders);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getDocumentFolderById
);

router.post(
  '/',
  validateBody(createDocumentFolderSchema),
  createDocumentFolder
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateDocumentFolderSchema),
  updateDocumentFolder
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteDocumentFolder
);

export default router;
