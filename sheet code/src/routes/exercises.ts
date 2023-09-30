import { Router, Request, Response } from 'express';

import { models } from '../db';

const router: Router = Router();

const { Exercise, Program } = models;

export default () => {
  router.get('/', async (_req: Request, res: Response) => {
    const exercises = await Exercise.findAll({
      include: [
        {
          model: Program,
          as: 'program',
        },
      ],
    });

    return res.json({
      data: exercises,
      message: 'List of exercises',
    });
  });

  return router;
};
