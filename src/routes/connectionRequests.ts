// src/routes/connectionRequests.ts
import { Router } from 'express';
import {
  createConnectionRequest,
  listConnectionRequests,
  getConnectionRequestById,
  updateConnectionRequestStatus,
  deleteConnectionRequest
} from '../controllers/connectionRequestController';
import { requireAuth } from '../middleware/authMiddleware';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createConnectionRequestSchema,
  updateConnectionRequestSchema
} from '../schemas/connectionRequestSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' })
});

// POST /api/connection-requests
router.post(
  '/',
  requireAuth,
  validateBody(createConnectionRequestSchema),
  createConnectionRequest
);

// GET /api/connection-requests
router.get('/', requireAuth, listConnectionRequests);

// GET /api/connection-requests/:id
router.get(
  '/:id',
  requireAuth,
  validateParams(idParamSchema, 'params'),
  getConnectionRequestById
);

// PATCH /api/connection-requests/:id
router.patch(
  '/:id',
  requireAuth,
  validateParams(idParamSchema, 'params'),
  validateBody(updateConnectionRequestSchema),
  updateConnectionRequestStatus
);

// DELETE /api/connection-requests/:id
router.delete(
  '/:id',
  requireAuth,
  validateParams(idParamSchema, 'params'),
  deleteConnectionRequest
);

export default router;
