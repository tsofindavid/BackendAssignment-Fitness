import { Router } from 'express';
import { ExercisesController } from './controller';
import { ErrorHanndler } from '../../middlewares/error-hanndler.middleware';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

export const ExercisesRouter = Router({ mergeParams: true })
  .use(AuthMiddleware)
  .get('/all', ErrorHanndler(ExercisesController.findAll))
  .get('/id/:id', ErrorHanndler(ExercisesController.findById))
  .get('/id/:id/start', ErrorHanndler(ExercisesController.start))
  .get('/id/:id/completed', ErrorHanndler(ExercisesController.completed))
  .get('/programId/:programId', ErrorHanndler(ExercisesController.findByProgramId))
  .post('/', ErrorHanndler(ExercisesController.create))
  .patch('/id/:id', ErrorHanndler(ExercisesController.update))
  .delete('/id/:id', ErrorHanndler(ExercisesController.delete));
