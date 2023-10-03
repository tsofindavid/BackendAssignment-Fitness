import { Router } from 'express';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { UsersController } from './controller';
import { ErrorHanndler } from '../../middlewares/error-hanndler.middleware';

export const UserRouter = Router({ mergeParams: true })
  .post('/login', ErrorHanndler(UsersController.login))
  .post('/register', ErrorHanndler(UsersController.register))
  .use(AuthMiddleware)
  .get('/', ErrorHanndler(UsersController.findMe))
  .get('/id/:id', ErrorHanndler(UsersController.findById))
  .get('/all', ErrorHanndler(UsersController.findAll))
  .patch('/', ErrorHanndler(UsersController.updateUser))
  .patch('/id/:id', ErrorHanndler(UsersController.updateUserById));
