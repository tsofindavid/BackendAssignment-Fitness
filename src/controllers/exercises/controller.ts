import { Request, Response } from 'express';
import { ExercisesService } from './service';
import { ExerciseCreationAttributes, ExerciseUpdationAttributes } from '../../database/models/exercise.model';
import { UserRole } from '../../enums/user.enums';
import { PermissionDeniedError } from '../../errors/http.errors';
import { Filter } from '../../types/filter.types';

export class ExercisesController {
  public static async findAll(req: Request<never, never, never, Filter>, res: Response): Promise<void> {
    const page: number = +req.query.page || 1;
    const limit: number = +req.query.limit || 20;

    const data = await ExercisesService.findAll({ page, limit }, req.query?.search);

    res.json({
      data,
      message: '',
    });
  }

  public static async findById(req: Request<{ id: string }>, res: Response): Promise<void> {
    const data = await ExercisesService.findById(+req.params.id);

    res.json({
      data,
      message: '',
    });
  }

  public static async findByProgramId(
    req: Request<{ programId: string }, never, never, Filter>,
    res: Response
  ): Promise<void> {
    const page: number = +req.query.page || 1;
    const limit: number = +req.query.limit || 20;

    const data = await ExercisesService.findByProgramId(+req.params.programId, { page, limit }, req.query?.search);

    res.json({
      data,
      message: '',
    });
  }

  public static async start(req: Request<{ id: string }>, res: Response): Promise<void> {
    const data = await ExercisesService.start(+req.params.id, req.user.id);

    res.json({
      data,
      message: '',
    });
  }

  public static async completed(req: Request<{ id: string }>, res: Response): Promise<void> {
    const data = await ExercisesService.completed(+req.params.id, req.user.id);

    res.json({
      data,
      message: '',
    });
  }

  public static async create(req: Request<never, never, ExerciseCreationAttributes>, res: Response): Promise<void> {
    if (req.user.role !== UserRole.ADMIN) {
      throw new PermissionDeniedError();
    }

    const data = await ExercisesService.create(req.body);

    res.json({
      data,
      message: 'Exercise was created.',
    });
  }

  public static async update(
    req: Request<{ id: string }, number, ExerciseUpdationAttributes>,
    res: Response
  ): Promise<void> {
    if (req.user.role !== UserRole.ADMIN) {
      throw new PermissionDeniedError();
    }

    await ExercisesService.update(+req.params.id, req.body);

    res.json({
      message: 'Exercise was updated.',
    });
  }

  public static async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
    if (req.user.role !== UserRole.ADMIN) {
      throw new PermissionDeniedError();
    }

    await ExercisesService.delete(+req.params.id);

    res.json({
      message: 'Exercise was deleted.',
    });
  }
}
