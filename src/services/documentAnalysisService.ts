import OpenAI from 'openai';
import { DocumentAnalysisResult } from '../models/DocumentAnalysisResult';
import { v4 as uuidv4 } from 'uuid';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export class DocumentAnalysisService {
  /**
   * Run an OCR/analysis on the text of the document,
   * then store and return the structured result.
   */
  static async analyze(documentId: string, userId: string, text: string) {
    // Call OpenAI to summarize/parse
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a document analysis engine.' },
        { role: 'user', content: `Analyze and summarize this text:\n\n${text}` }
      ]
    });

    const analysis = {
      summary: response.choices[0]?.message?.content ?? ''
    };

    // Persist
    const result = await DocumentAnalysisResult.create({
      id: uuidv4(),
      documentId,
      userId,
      analysis
    });

    return result;
  }

  /** Fetch all past analyses for a given document */
  static async getResults(documentId: string) {
    return DocumentAnalysisResult.findAll({
      where: { documentId },
      order: [['createdAt', 'DESC']]
    });
  }
}
