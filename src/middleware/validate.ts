// src/middleware/validate.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema, ZodError, ZodTypeAny } from 'zod';

/**
 * validateBody
 * Parses and validates req.body against the provided Zod schema.
 */
export const validateBody = (schema: ZodSchema<any>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation error',
          issues: err.issues.map(issue => ({
            path: issue.path.join('.'),
            message: issue.message,
          })),
        });
      }
      next(err);
    }
  };
};

/**
 * validateParams
 * Parses and validates either req.params or req.query against the provided Zod schema.
 * @param schema - Zod schema to validate against
 * @param key - 'params' or 'query'
 */
export const validateParams = (
  schema: ZodSchema<any>,
  key: 'params' | 'query'
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // @ts-ignore
      req[key] = schema.parse(req[key]);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation error',
          issues: err.issues.map(issue => ({
            path: issue.path.join('.'),
            message: issue.message,
          })),
        });
      }
      next(err);
    }
  };
};

/**
 * validateQuery
 * Validate `req.query` against a Zod schema.
 */
export function validateQuery<T>(
  schema: ZodSchema<T>,
  key: 'query'
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res
        .status(400)
        .json({ success: false, errors: result.error.flatten().fieldErrors });
    }
    req.query = result.data as any;
    next();
  };
}

/**
 * validate
 * Generic validator for req.body using any Zod schema.
 */
export function validate(schema: ZodTypeAny): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: 'Validation error',
        details: result.error.format(),
      });
      return;
    }
    req.body = result.data;
    next();
  };
}
