import { Router } from 'express';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { UsersController } from './controller';
import { HandlerWrapper } from '../../middlewares/error-hanndler.middleware';

export const UserRouter = Router({ mergeParams: true })
  .get('/profile', AuthMiddleware, HandlerWrapper(UsersController.profile))
  .post('/login', HandlerWrapper(UsersController.login))
  .post('/register', HandlerWrapper(UsersController.register));
