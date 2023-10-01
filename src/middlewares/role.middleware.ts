import { Request, Response, NextFunction } from 'express';

export const RoleMiddleware = function (req: Request, res: Response, next: NextFunction) {
  console.log('RoleMiddleware');
  next();
};
