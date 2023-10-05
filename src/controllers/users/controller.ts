import { Request, Response } from 'express';
import { UsersService } from './service';
import { UserCreationAttributes, UserUpdateAttributes } from '../../database/models/user.model';
import { UserRole } from '../../enums/user.enums';
import { PermissionDeniedError } from '../../errors/http.errors';
import { UserLocalization } from '../../lockalization/user.localization';

export class UsersController {
  public static async register(
    req: Request<never, never, UserCreationAttributes, never>,
    res: Response
  ): Promise<void> {
    const language = req.headers?.language || 'en';

    await UsersService.register(req.body);

    res.json({
      message: UserLocalization.register[language],
    });
  }

  public static async login(
    req: Request<never, never, { email: string; password: string }>,
    res: Response
  ): Promise<void> {
    const language = req.headers?.language || 'en';

    const data = await UsersService.login(req.body);

    res.json({
      data,
      message: UserLocalization.login[language],
    });
  }

  public static async findMe(req: Request, res: Response): Promise<void> {
    const language = req.headers?.language || 'en';

    const data = await UsersService.getUserById({ id: req.user.id });

    res.json({ data, message: UserLocalization.findMe[language] });
  }

  public static async findAll(
    req: Request<never, never, never, { page: string; limit: string }>,
    res: Response
  ): Promise<void> {
    const language = req.headers?.language || 'en';
    const page: number = +req.query.page || 1;
    const limit: number = +req.query.limit || 20;

    const data = await UsersService.findAll({ page, limit }, req.user.role === UserRole.ADMIN);

    res.json({ data, message: UserLocalization.findAll[language] });
  }

  public static async findById(req: Request<{ id: string }, never, never>, res: Response): Promise<void> {
    const language = req.headers?.language || 'en';

    if (req.user.role !== UserRole.ADMIN) {
      throw new PermissionDeniedError();
    }

    const data = await UsersService.getUserById({ id: +req.params.id });

    res.json({ data, message: UserLocalization.findById[language] });
  }

  public static async updateUser(req: Request<never, never, UserUpdateAttributes>, res: Response): Promise<void> {
    const language = req.headers?.language || 'en';

    await UsersService.updateUserById(req.user.id, req.body);

    res.json({ message: UserLocalization.updateUser[language] });
  }

  public static async updateUserById(
    req: Request<{ id: string }, never, UserUpdateAttributes>,
    res: Response
  ): Promise<void> {
    const language = req.headers?.language || 'en';

    if (req.user.role !== UserRole.ADMIN) {
      throw new PermissionDeniedError();
    }

    await UsersService.updateUserById(+req.params.id, req.body);

    res.json({ message: UserLocalization.updateUserById[language] });
  }
}
