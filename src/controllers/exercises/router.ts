import { Router } from 'express';
import { ExercisesController } from './controller';
import { ErrorHandler } from '../../middlewares/error-hanndler.middleware';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

export const ExercisesRouter = Router({ mergeParams: true })
  .use(AuthMiddleware)
  .get('/all', ErrorHandler(ExercisesController.findAll))
  .get('/id/:id', ErrorHandler(ExercisesController.findById))
  .get('/id/:id/start', ErrorHandler(ExercisesController.start))
  .get('/id/:id/completed', ErrorHandler(ExercisesController.completed))
  .get('/programId/:programId', ErrorHandler(ExercisesController.findByProgramId))
  .post('/', ErrorHandler(ExercisesController.create))
  .patch('/id/:id', ErrorHandler(ExercisesController.update))
  .delete('/id/:id', ErrorHandler(ExercisesController.delete));
