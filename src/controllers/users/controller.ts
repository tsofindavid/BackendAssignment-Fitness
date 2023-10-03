import { Request, Response } from 'express';
import { UsersService } from './service';
import { UserCreationAttributes, UserUpdateAttributes } from '../../database/models/user.model';
import { UserRole } from '../../enums/user.enums';
import { PermissionDeniedError } from '../../errors/http.errors';

export class UsersController {
  public static async register(req: Request<never, never, UserCreationAttributes>, res: Response): Promise<void> {
    await UsersService.register(req.body);

    res.json({
      message: 'User registered successfully',
    });
  }

  public static async login(
    req: Request<never, never, { email: string; password: string }>,
    res: Response
  ): Promise<void> {
    const data = await UsersService.login(req.body);

    res.json({
      data,
      message: 'User was registered.',
    });
  }

  public static async findMe(req: Request, res: Response): Promise<void> {
    const data = await UsersService.getUserById({ id: req.user.id });

    res.json({ data, message: '' });
  }

  public static async findAll(
    req: Request<never, never, never, { page: string; limit: string }>,
    res: Response
  ): Promise<void> {
    const page: number = +req.query.page || 1;
    const limit: number = +req.query.limit || 20;

    const data = await UsersService.findAll({ page, limit }, req.user.role === UserRole.ADMIN);

    res.json({ data, message: '' });
  }

  public static async findById(req: Request<{ id: string }, never, never>, res: Response): Promise<void> {
    if (req.user.role !== UserRole.ADMIN) {
      throw new PermissionDeniedError();
    }

    const data = await UsersService.getUserById({ id: +req.params.id });

    res.json({ data, message: '' });
  }

  public static async updateUser(req: Request<never, never, UserUpdateAttributes>, res: Response): Promise<void> {
    await UsersService.updateUserById(req.user.id, req.body);

    res.json({ message: 'User was updated.' });
  }

  public static async updateUserById(
    req: Request<{ id: string }, never, UserUpdateAttributes>,
    res: Response
  ): Promise<void> {
    if (req.user.role !== UserRole.ADMIN) {
      throw new PermissionDeniedError();
    }

    await UsersService.updateUserById(+req.params.id, req.body);

    res.json({ message: 'User was updated.' });
  }
}
