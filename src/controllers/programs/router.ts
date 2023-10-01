import { Router } from 'express';
import { ProgramsController } from './controller';

export const ProgramsRouter = Router({ mergeParams: true }).get('/', ProgramsController.findAll);
