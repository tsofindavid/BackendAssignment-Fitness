import { Router } from 'express';
import { ProgramsController } from './controller';
import { ErrorHandler } from '../../middlewares/error-hanndler.middleware';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

export const ProgramsRouter = Router({ mergeParams: true })
  .get('/all', AuthMiddleware, ErrorHandler(ProgramsController.findAll))
  .get('/id/:id', AuthMiddleware, ErrorHandler(ProgramsController.findById))
  .post('/', AuthMiddleware, ErrorHandler(ProgramsController.create))
  .patch('/id/:id', AuthMiddleware, ErrorHandler(ProgramsController.update))
  .delete('/id/:id', AuthMiddleware, ErrorHandler(ProgramsController.delete));
