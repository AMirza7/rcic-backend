import { Request, Response, NextFunction } from 'express';
import { AIChatService } from '../services/aiChatService';

export const postChatMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionId, content } = req.body;
    const userId = req.user.id;

    const { userMessage, aiMessage } = await AIChatService.sendMessage(
      sessionId,
      userId,
      content
    );

    res.status(201).json({ userMessage, aiMessage });
  } catch (err) {
    next(err);
  }
};

export const getChatMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionId } = req.params;
    const messages = await AIChatService.getSessionMessages(sessionId);
    res.json(messages);
  } catch (err) {
    next(err);
  }
};
