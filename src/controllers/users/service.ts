import { UserCreationAttributes, UserModel } from '../../database/models/user.model';
import bcrypt from 'bcrypt';
import { BadRequestError, NotFoundError } from '../../errors/http-error';
import { sign } from 'jsonwebtoken';
import { JwtConfig } from '../../configs/jwt.config';

export class UsersService {
  public static async register(attributes: UserCreationAttributes): Promise<void> {
    const { password } = attributes;

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({ ...attributes, password: hashedPassword });
  }

  public static async login({ email, password }: { email: string; password: string }): Promise<any> {
    const user = await UserModel.findOne({
      rejectOnEmpty: undefined,
      raw: true,
      where: { email },
      attributes: ['id', 'email', 'password', 'role'],
    });

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestError('Invalid username or password.');
    }

    delete user.password;

    return {
      token: sign(user, JwtConfig.jwtSecret, { expiresIn: JwtConfig.jwtExpiresIn }),
    };
  }

  public static async profile({ id }: { id: number }): Promise<UserModel> {
    return UserModel.findOne({ rejectOnEmpty: false, where: { id }, attributes: { exclude: ['password'] } });
  }
}
