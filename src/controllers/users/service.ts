import { UserCreationAttributes, UserModel, UserUpdateAttributes } from '../../database/models/user.model';
import bcrypt from 'bcrypt';
import { BadRequestError, NotFoundError } from '../../errors/http.errors';
import { sign } from 'jsonwebtoken';
import { JwtConfig } from '../../configs/jwt.config';
import { FindAttributeOptions } from 'sequelize';
import { DatabaseUtils } from '../../utils/database.util';

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

  public static async getUserById({ id }: { id: number }): Promise<UserModel> {
    const result = UserModel.findOne({ rejectOnEmpty: false, where: { id }, attributes: { exclude: ['password'] } });

    if (!result) {
      throw new NotFoundError();
    }

    return result;
  }

  public static async updateUserById(id: number, user: UserUpdateAttributes): Promise<void> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await UserModel.update({ ...user, password: hashedPassword }, { returning: true, where: { id } });
  }

  public static async findAll(
    pagination: { page: number; limit: number },
    isAdminRequest: boolean
  ): Promise<UserModel[]> {
    let attributes: FindAttributeOptions;

    if (isAdminRequest) {
      attributes = { exclude: ['password'] };
    } else {
      attributes = ['id', 'nickname'];
    }

    const result = await UserModel.findAll({
      rejectOnEmpty: false,
      attributes,
      ...DatabaseUtils.getPaginationConfig(pagination),
    });

    if (!result) {
      throw new NotFoundError();
    }

    return result;
  }
}
