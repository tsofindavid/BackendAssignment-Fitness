import { ProgramsService } from './service';
import { Request, Response } from 'express';

export class ProgramsController {
  public static async findAll(req: Request, res: Response): Promise<void> {
    const data = await ProgramsService.findAll();

    res.json({
      data,
      message: 'List of programs',
    });
  }
}
