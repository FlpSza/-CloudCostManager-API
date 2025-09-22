import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateQuery = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      res.status(400).json({
        error: 'Invalid query parameters',
        details: error,
      });
    }
  };
};
