import { Router } from 'express';
import UserRouter from './controllers/users/router';
import ProgramsRouter from './controllers/programs/router';
import ExercisesRouter from './controllers/exercises/router';

export default function routes(router: Router): void {
  router.use(UserRouter).use(ProgramsRouter).use(ExercisesRouter);
}
