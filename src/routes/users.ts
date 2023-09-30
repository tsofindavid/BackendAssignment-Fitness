import { Router, Request, Response } from 'express';

import { models } from '../db';

const router: Router = Router();

const { Users } = models;

export default () => {
  router.get('/', async (_req: Request, res: Response) => {
    const programs = await Users.findAll();
    return res.json({
      data: programs,
      message: 'List of programs',
    });
  });

  return router;
};
