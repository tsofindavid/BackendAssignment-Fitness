import { Router } from 'express';
import { ProgramsController } from './controller';
import { ErrorHanndler } from '../../middlewares/error-hanndler.middleware';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

export const ProgramsRouter = Router({ mergeParams: true })
  .get('/all', AuthMiddleware, ErrorHanndler(ProgramsController.findAll))
  .get('/id/:id', AuthMiddleware, ErrorHanndler(ProgramsController.findById))
  .post('/', AuthMiddleware, ErrorHanndler(ProgramsController.create))
  .patch('/id/:id', AuthMiddleware, ErrorHanndler(ProgramsController.update))
  .delete('/id/:id', AuthMiddleware, ErrorHanndler(ProgramsController.delete));
