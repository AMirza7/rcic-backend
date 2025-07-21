// src/controllers/conversationController.ts
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Conversation } from '../models/Conversation';
import { ConversationParticipant } from '../models/ConversationParticipant';
import { Message, MessageCreationAttributes } from '../models/Message';
import { paginationSchema } from '../schemas/paginationSchemas';

export const createConversation = async (req: Request, res: Response) => {
  const { title, participants } = req.body as {
    title?: string;
    participants: { userId: string; role: string }[];
  };
  try {
    const convo = await Conversation.create({ title });
    await Promise.all(
      participants.map(({ userId, role }) =>
        ConversationParticipant.create({
          conversationId: convo.id,
          userId,
          role: role as any
        })
      )
    );
    return res.status(201).json(convo);
  } catch (err) {
    console.error('createConversation error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getConversations = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  try {
    // fetch all participant records for this user
    const parts = await ConversationParticipant.findAll({
      where: { userId },
      attributes: ['conversationId', 'lastReadAt']
    });

    const convos = await Conversation.findAll({
      where: { id: parts.map(p => p.conversationId) }
    });

    // calculate unread per convo
    const results = await Promise.all(
      convos.map(async convo => {
        const part = parts.find(p => p.conversationId === convo.id)!;
        const since = part.lastReadAt ?? new Date(0);
        const unreadCount = await Message.count({
          where: {
            conversationId: convo.id,
            timestamp: { [Op.gt]: since }
          }
        });
        return {
          ...convo.toJSON(),
          unreadCount
        };
      })
    );

    return res.json(results);
  } catch (err) {
    console.error('getConversations error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getConversationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const convo = await Conversation.findByPk(id, {
      include: [
        { model: ConversationParticipant, as: 'participants' },
        {
          model: Message,
          as: 'messages',
          order: [['timestamp', 'ASC']]
        }
      ]
    });
    if (!convo) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    return res.json(convo);
  } catch (err) {
    console.error('getConversationById error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateConversation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body as { title?: string };
  try {
    const [count] = await Conversation.update({ title }, { where: { id } });
    if (!count) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    const updated = await Conversation.findByPk(id);
    return res.json(updated);
  } catch (err) {
    console.error('updateConversation error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteConversation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const count = await Conversation.destroy({ where: { id } });
    if (!count) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    return res.status(204).send();
  } catch (err) {
    console.error('deleteConversation error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const addParticipant = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, role } = req.body as { userId: string; role: string };
  try {
    const part = await ConversationParticipant.create({
      conversationId: id,
      userId,
      role: role as any
    });
    return res.status(201).json(part);
  } catch (err) {
    console.error('addParticipant error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const removeParticipant = async (req: Request, res: Response) => {
  const { id, participantId } = req.params;
  try {
    const count = await ConversationParticipant.destroy({
      where: { id: participantId, conversationId: id }
    });
    if (!count) {
      return res.status(404).json({ message: 'Participant not found' });
    }
    return res.status(204).send();
  } catch (err) {
    console.error('removeParticipant error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET  /api/conversations/:id/messages
export const getMessagesForConversation = async (
  req: Request,
  res: Response
) => {
  const { id: conversationId } = req.params;

  // parse & default pagination
  const result = paginationSchema.safeParse(req.query);
  let page = 1;
  let limit = 50;
  if (result.success) {
    const { page: p, limit: l } = result.data;
    if (typeof p === 'number' && p > 0) page = p;
    if (typeof l === 'number' && l > 0) limit = l;
  }
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Message.findAndCountAll({
      where: { conversationId },
      order: [['timestamp', 'ASC']],
      limit,
      offset
    });

    return res.json({
      meta: { total: count, page, limit, pages: Math.ceil(count / limit) },
      data: rows
    });
  } catch (err) {
    console.error('getMessagesForConversation error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /api/conversations/:id/messages
export const postMessageInConversation = async (
  req: Request,
  res: Response
) => {
  const { id: conversationId } = req.params;
  const { senderId, recipientId, content, timestamp } = req.body as {
    senderId: string;
    recipientId: string;
    content: string;
    timestamp: string;
  };

  try {
    const payload: MessageCreationAttributes = {
      conversationId,
      senderId,
      recipientId,
      content,
      timestamp: new Date(timestamp)
    };
    const newMsg = await Message.create(payload);
    return res.status(201).json(newMsg);
  } catch (err) {
    console.error('postMessageInConversation error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /api/conversations/:id/read
export const markAsRead = async (req: Request, res: Response) => {
  const { id: conversationId } = req.params;
  const userId = (req as any).user.id;
  try {
    const [updated] = await ConversationParticipant.update(
      { lastReadAt: new Date() },
      { where: { conversationId, userId } }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Participant not found' });
    }
    return res.status(204).send();
  } catch (err) {
    console.error('markAsRead error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
