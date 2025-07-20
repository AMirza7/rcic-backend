import { Request, Response, NextFunction } from 'express';
import { DocumentAnalysisService } from '../services/documentAnalysisService';

export const analyzeDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { documentId, analysis: text } = req.body;
    const userId = req.user.id;

    const result = await DocumentAnalysisService.analyze(
      documentId,
      userId,
      text
    );

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const getAnalysisResults = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params;
    const results = await DocumentAnalysisService.getResults(documentId);
    res.json(results);
  } catch (err) {
    next(err);
  }
};
