import { Router } from 'express';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { UsersController } from './controller';
import { ErrorHandler } from '../../middlewares/error-hanndler.middleware';

export const UserRouter = Router({ mergeParams: true })
  .post('/login', ErrorHandler(UsersController.login))
  .post('/register', ErrorHandler(UsersController.register))
  .use(AuthMiddleware)
  .get('/', ErrorHandler(UsersController.findMe))
  .get('/id/:id', ErrorHandler(UsersController.findById))
  .get('/all', ErrorHandler(UsersController.findAll))
  .patch('/', ErrorHandler(UsersController.updateUser))
  .patch('/id/:id', ErrorHandler(UsersController.updateUserById));
