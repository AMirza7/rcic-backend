// src/routes/message.ts
import { Router } from 'express';
import {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
} from '../controllers/messageController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createMessageSchema,
  updateMessageSchema,
} from '../schemas/messageSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllMessages);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getMessageById
);

router.post(
  '/',
  validateBody(createMessageSchema),
  createMessage
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateMessageSchema),
  updateMessage
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteMessage
);

export default router;
