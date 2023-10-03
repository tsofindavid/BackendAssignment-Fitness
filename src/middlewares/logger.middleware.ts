import { Response, NextFunction, Request, RequestHandler } from 'express';

export const LoggerMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toLocaleTimeString()}] [${req.url}] [${req.method}]`);
  next();
};
