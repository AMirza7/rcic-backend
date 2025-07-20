import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import {validate} from '../middleware/validate';
import { enhancedChatMessageSchema } from '../schemas/aiSchemas';
import { postChatMessage, getChatMessages } from '../controllers/aiChatController';

const router = Router();
router.use(requireAuth);

router.post('/chat', validate(enhancedChatMessageSchema), postChatMessage);
router.get('/chat/:sessionId', getChatMessages);

export default router;
