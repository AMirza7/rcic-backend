// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

/**
 * Catches any errors thrown in controllers and sends a JSON response
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Unhandled error:', err);
  const status = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  res.status(status).json({ message });
};
