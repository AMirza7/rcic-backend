import OpenAI from 'openai';
import { EnhancedChatMessage } from '../models/EnhancedChatMessage';
import { v4 as uuidv4 } from 'uuid';

// Initialize the OpenAI client (ensure OPENAI_API_KEY in your env)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class AIChatService {
  /**
   * Send a new user message, store it, call OpenAI, store the assistant reply, and return both.
   */
  static async sendMessage(sessionId: string, userId: string, content: string) {
    // Persist user message
    const userMessage = await EnhancedChatMessage.create({
      id: uuidv4(),
      sessionId,
      userId,
      role: 'user',
      content,
      sources: [],
      attachments: [],
      actions: [],
      sentiment: 'neutral',
      metadata: {}
    });

    // Call OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are RCIC‑backend AI assistant.' },
        { role: 'user', content }
      ]
    });

    const aiContent = response.choices[0]?.message?.content ?? '';

    // Persist assistant message
    const aiMessage = await EnhancedChatMessage.create({
      id: uuidv4(),
      sessionId,
      userId,
      role: 'assistant',
      content: aiContent,
      sources: [],       // you could parse citations out of response
      attachments: [],
      actions: [],
      sentiment: 'neutral',
      metadata: {}
    });

    return { userMessage, aiMessage };
  }

  /** Fetch the full chat for a session */
  static async getSessionMessages(sessionId: string) {
    return EnhancedChatMessage.findAll({
      where: { sessionId },
      order: [['createdAt', 'ASC']]
    });
  }
}
