import { z } from 'zod';

export const enhancedChatMessageSchema = z.object({
  sessionId: z.string().uuid(),
  role: z.enum(['user', 'assistant']),
  content: z.string(),
  sources: z.array(z.object({
    title: z.string(),
    url: z.string().url()
  })),
  attachments: z.array(z.object({
    id: z.string().uuid(),
    url: z.string().url(),
    type: z.string()
  })),
  actions: z.array(z.object({
    type: z.string(),
    payload: z.any()
  })),
  sentiment: z.enum(['positive', 'neutral', 'negative']),
  metadata: z.record(z.any())
});

export const documentAnalysisSchema = z.object({
  documentId: z.string().uuid(),
  analysis: z.record(z.any())
});

// For case‑analysis, params only
export const caseAnalysisParamsSchema = z.object({
  caseId: z.string().uuid()
});
