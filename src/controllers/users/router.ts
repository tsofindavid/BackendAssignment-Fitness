import { Router } from 'express';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import UsersController from '../users/controller';

export const UserRouter = Router({ mergeParams: true })
  .get('/login', UsersController.login)
  .get('/profile', AuthMiddleware, UsersController.profile)
  .post('/register', UsersController.register);
