// src/middleware/validateQuery.ts
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validateQuery =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.format() });
    }
    req.query = result.data as any;
    next();
  };
