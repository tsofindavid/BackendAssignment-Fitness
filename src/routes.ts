import { Router } from 'express';
import { UserRouter } from './controllers/users/router';
import { ProgramsRouter } from './controllers/programs/router';
import { ExercisesRouter } from './controllers/exercises/router';

export const routerV1 = Router()
  .use('/users', UserRouter)
  .use('/programs', ProgramsRouter)
  .use('/exercises', ExercisesRouter);
