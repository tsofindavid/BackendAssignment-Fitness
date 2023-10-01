import { Request, Response } from 'express';
import { ExercisesService } from './service';

export class ExercisesController {
  public static async findAll(req: Request, res: Response): Promise<void> {
    const data = await ExercisesService.findAll();

    res.json({
      data,
      message: 'List of exercises',
    });
  }
}
