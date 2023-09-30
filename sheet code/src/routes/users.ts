import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';

import { models } from '../db';

const router: Router = Router();

const { Users } = models;

export default () => {
  router.post('/register', async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    try {
      const passwordHash = await bcrypt.hash(password, 10);

      await Users.create({

      });

      res.status(200).json({ username, message: 'Sign up suceesfully' });
    } catch (error) {
      res.status(400).json({ error });
    }
  });

  router.get('/', async (_req: Request, res: Response) => {
    const programs = await Users.findAll();
    return res.json({
      data: programs,
      message: 'List of programs',
    });
  });

  return router;
};
