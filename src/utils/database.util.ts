import { Op } from 'sequelize';

export class DatabaseUtils {
  public static getPaginationConfig({ page, limit }: { page: number; limit: number }): {
    limit: number;
    offset: number;
  } {
    return { offset: (page - 1) * limit, limit };
  }

  public static getSearchConfig(value, search): Record<any, any> {
    return search ? { where: { [value]: { [Op.iLike]: `%${search}` } } } : {};
  }
}
