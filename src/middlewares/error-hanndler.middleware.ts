import { RequestHandler } from 'express';

export const ErrorHandler = (handler: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      const result: unknown | Promise<unknown> = handler(req, res, next);

      if (typeof result === 'object' && 'then' in result) {
        await result;
      }
    } catch ({ message, status }) {
      res.status(status || 500).json({ message });
    }
  };
};
