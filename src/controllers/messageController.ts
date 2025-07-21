// src/controllers/messageController.ts
import { Request, Response } from 'express';
import { Message, MessageCreationAttributes } from '../models/Message';

export const getAllMessages = async (_req: Request, res: Response) => {
  try {
    const messages = await Message.findAll();
    return res.json(messages);
  } catch (error) {
    console.error('getAllMessages error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMessageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const msg = await Message.findByPk(id);
    if (!msg) {
      return res.status(404).json({ message: 'Message not found' });
    }
    return res.json(msg);
  } catch (error) {
    console.error('getMessageById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { senderId, recipientId, content, timestamp, conversationId } = req.body as {
      senderId: string;
      recipientId: string;
      content: string;
      timestamp: string;
      conversationId: string;
    };

    const payload: MessageCreationAttributes = {
      senderId,
      recipientId,
      content,
      timestamp: new Date(timestamp),
      conversationId,
    };

    const newMsg = await Message.create(payload);
    return res.status(201).json(newMsg);
  } catch (error) {
    console.error('createMessage error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { senderId, recipientId, content, timestamp } = req.body as {
      senderId?: string;
      recipientId?: string;
      content?: string;
      timestamp?: string;
    };

    const updatePayload: Partial<MessageCreationAttributes> = {};
    if (senderId) updatePayload.senderId = senderId;
    if (recipientId) updatePayload.recipientId = recipientId;
    if (content) updatePayload.content = content;
    if (timestamp) updatePayload.timestamp = new Date(timestamp);

    const [updatedCount] = await Message.update(updatePayload, { where: { id } });
    if (updatedCount === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }

    const updatedMsg = await Message.findByPk(id);
    return res.json(updatedMsg);
  } catch (error) {
    console.error('updateMessage error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCount = await Message.destroy({ where: { id } });
    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('deleteMessage error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
