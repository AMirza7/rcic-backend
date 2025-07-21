// src/routes/conversation.ts
import { Router } from 'express';
import {
  createConversation,
  getConversations,
  getConversationById,
  updateConversation,
  deleteConversation,
  addParticipant,
  removeParticipant,
  getMessagesForConversation,
  postMessageInConversation,
  markAsRead
} from '../controllers/conversationController';
import { validateBody, validateParams } from '../middleware/validate';
import {
  createConversationSchema,
  updateConversationSchema,
  addParticipantSchema
} from '../schemas/conversationSchemas';
import { createMessageSchema } from '../schemas/messageSchemas';
import { validateQuery } from '../middleware/validateQuery';
import { paginationSchema } from '../schemas/paginationSchemas';
import { z } from 'zod';

const router = Router();

// UUID param
const idParam = z.object({ id: z.string().uuid() });
const participantParam = z.object({ participantId: z.string().uuid() });

router.post(
  '/',
  validateBody(createConversationSchema),
  createConversation
);

router.get('/', getConversations);

router.get(
  '/:id',
  validateParams(idParam, 'params'),
  getConversationById
);

router.put(
  '/:id',
  validateParams(idParam, 'params'),
  validateBody(updateConversationSchema),
  updateConversation
);

router.delete(
  '/:id',
  validateParams(idParam, 'params'),
  deleteConversation
);

// participants
router.post(
  '/:id/participants',
  validateParams(idParam, 'params'),
  validateBody(addParticipantSchema),
  addParticipant
);

router.delete(
  '/:id/participants/:participantId',
  validateParams(idParam, 'params'),
  validateParams(participantParam, 'params'),
  removeParticipant
);

router.get(
    '/:id/messages',
    validateParams(idParam, 'params'),
    getMessagesForConversation
  );
  
  router.post(
    '/:id/messages',
    validateParams(idParam, 'params'),
    validateBody(createMessageSchema),
    postMessageInConversation
  );

  router.get(
    '/:id/messages',
    validateParams(idParam, 'params'),
    validateQuery(paginationSchema),
    getMessagesForConversation
  );

  // List & page messages in a thread
router.get(
  '/:id/messages',
  validateParams(idParam, 'params'),
  validateQuery(paginationSchema),
  getMessagesForConversation
);

// Post a new message into a thread
router.post(
  '/:id/messages',
  validateParams(idParam, 'params'),
  validateBody(createMessageSchema),
  postMessageInConversation
);

// Mark the current user’s thread as read
router.post(
  '/:id/read',
  validateParams(idParam, 'params'),
  markAsRead
);

export default router;
