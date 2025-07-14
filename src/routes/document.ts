// src/routes/document.ts
import { Router, RequestHandler } from 'express';
import {
  getAllDocuments,
  getDocumentById,
  uploadMiddleware,
  uploadDocument,
  downloadDocument,
  deleteDocument,
} from '../controllers/documentController';
import { validateParams } from '../middleware/validate';
import { z } from 'zod';

const router = Router();
const idParamSchema = z.object({ id: z.string().uuid() });

router.get('/', getAllDocuments);
router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getDocumentById
);

// Cast your handler here so TS picks the right overload:
router.post(
  '/upload',
  uploadMiddleware,
  uploadDocument as RequestHandler
);

router.get(
  '/:id/download',
  validateParams(idParamSchema, 'params'),
  downloadDocument
);
router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteDocument
);

export default router;
