import { Router } from 'express';
import UsersController from '../users/controller';

export default Router({ mergeParams: true })
  .get('/login', UsersController.login)
  .get('/profile', UsersController.profile)
  .post('/register', UsersController.register);
