import { Router } from 'express';
import { ExercisesController } from './controller';

export const ExercisesRouter = Router({ mergeParams: true }).get('/', ExercisesController.findAll);
