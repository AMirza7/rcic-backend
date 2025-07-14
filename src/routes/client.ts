// src/routes/client.ts
import { Router } from 'express';
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} from '../controllers/clientController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createClientSchema,
  updateClientSchema,
} from '../schemas/clientSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllClients);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getClientById
);

router.post(
  '/',
  validateBody(createClientSchema),
  createClient
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateClientSchema),
  updateClient
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteClient
);

export default router;
