import { ProgramsService } from './service';
import { Request, Response } from 'express';
import { UserRole } from '../../enums/user.enums';
import { PermissionDeniedError } from '../../errors/http.errors';
import { ProgramCreationAttributes, ProgramUpdatationAttributes } from '../../database/models/program.model';

export class ProgramsController {
  public static async findAll(req: Request<never, never, never>, res: Response): Promise<void> {
    const page: number = req.query.page ? +req.query.page : 1;
    const limit: number = req.query.limit ? +req.query.limit : 20;
    const search: string | undefined = req.query.search ? (req.query.search as string) : undefined;

    const data = await ProgramsService.findAll({ page, limit }, search);

    res.json({
      data,
      message: '',
    });
  }

  public static async findById(req: Request<{ id: string }>, res: Response): Promise<void> {
    const data = await ProgramsService.findById(+req.params.id);

    res.json({
      data,
      message: '',
    });
  }

  public static async create(req: Request<never, never, ProgramCreationAttributes>, res: Response): Promise<void> {
    if (req.user.role !== UserRole.ADMIN) {
      throw new PermissionDeniedError();
    }

    const data = await ProgramsService.create(req.body);

    res.json({
      data,
      message: 'Program was created.',
    });
  }

  public static async update(
    req: Request<{ id: string }, never, ProgramUpdatationAttributes>,
    res: Response
  ): Promise<void> {
    if (req.user.role !== UserRole.ADMIN) {
      throw new PermissionDeniedError();
    }

    await ProgramsService.update(+req.params.id, req.body);

    res.json({
      message: 'Program was updated.',
    });
  }

  public static async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
    if (req.user.role !== UserRole.ADMIN) {
      throw new PermissionDeniedError();
    }

    await ProgramsService.delete(+req.params.id);

    res.json({
      message: 'Program was deleted.',
    });
  }
}
