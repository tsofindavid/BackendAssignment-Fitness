import { Request, Response } from 'express';
import { UsersService } from './service';
import { UserCreationAttributes } from '../../database/models/user.model';
import { NotFoundError } from '../../errors/http-error';

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
      message: 'User waw registered.',
    });
  }

  public static async profile(
    req: Request<never, never, { email: string; password: string }>,
    res: Response
  ): Promise<void> {
    if (!req.user?.id) {
      throw new NotFoundError('User context not found.');
    }

    const data = await UsersService.profile({ id: req.user.id });

    res.json({ data, message: '' });
  }
}
