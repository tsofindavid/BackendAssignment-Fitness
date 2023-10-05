import { Request, Response } from 'express';
import { ExercisesService } from './service';
import { ExerciseCreationAttributes, ExerciseUpdationAttributes } from '../../database/models/exercise.model';
import { UserRole } from '../../enums/user.enums';
import { PermissionDeniedError } from '../../errors/http.errors';
import { ExercisesLocalization } from '../../lockalization/exercises.localization';

export class ExercisesController {
  public static async findAll(req: Request<never, never, never>, res: Response): Promise<void> {
    const language = req.headers?.language || 'en';

    const page: number = req.query.page ? +req.query.page : 1;
    const limit: number = req.query.limit ? +req.query.limit : 20;
    const search: string | undefined = req.query.search ? (req.query.search as string) : undefined;

    const data = await ExercisesService.findAll({ page, limit }, search);

    res.json({
      data,
      message: ExercisesLocalization.findAll[language],
    });
  }

  public static async findById(req: Request<{ id: string }>, res: Response): Promise<void> {
    const language = req.headers?.language || 'en';

    const data = await ExercisesService.findById(+req.params.id);

    res.json({
      data,
      message: ExercisesLocalization.findById[language],
    });
  }

  public static async findByProgramId(req: Request<{ programId: string }, never, never>, res: Response): Promise<void> {
    const language = req.headers?.language || 'en';

    const page: number = req.query.page ? +req.query.page : 1;
    const limit: number = req.query.limit ? +req.query.limit : 20;
    const search: string | undefined = req.query.search ? (req.query.search as string) : undefined;

    const data = await ExercisesService.findByProgramId(+req.params.programId, { page, limit }, search);

    res.json({
      data,
      message: ExercisesLocalization.findByProgramId[language],
    });
  }

  public static async start(req: Request<{ id: string }>, res: Response): Promise<void> {
    const language = req.headers?.language || 'en';

    const data = await ExercisesService.start(+req.params.id, req.user.id);

    res.json({
      data,
      message: ExercisesLocalization.start[language],
    });
  }

  public static async completed(req: Request<{ id: string }>, res: Response): Promise<void> {
    const language = req.headers?.language || 'en';

    const data = await ExercisesService.completed(+req.params.id, req.user.id);

    res.json({
      data,
      message: ExercisesLocalization.completed[language],
    });
  }

  public static async create(req: Request<never, never, ExerciseCreationAttributes>, res: Response): Promise<void> {
    const language = req.headers?.language || 'en';

    if (req.user.role !== UserRole.ADMIN) {
      throw new PermissionDeniedError();
    }

    const data = await ExercisesService.create(req.body);

    res.json({
      data,
      message: ExercisesLocalization.create[language],
    });
  }

  public static async update(
    req: Request<{ id: string }, number, ExerciseUpdationAttributes>,
    res: Response
  ): Promise<void> {
    const language = req.headers?.language || 'en';

    if (req.user.role !== UserRole.ADMIN) {
      throw new PermissionDeniedError();
    }

    await ExercisesService.update(+req.params.id, req.body);

    res.json({
      message: ExercisesLocalization.update[language],
    });
  }

  public static async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
    const language = req.headers?.language || 'en';

    if (req.user.role !== UserRole.ADMIN) {
      throw new PermissionDeniedError();
    }

    await ExercisesService.delete(+req.params.id);

    res.json({
      message: ExercisesLocalization.delete[language],
    });
  }
}
