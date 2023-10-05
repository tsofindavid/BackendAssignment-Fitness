import { ProgramModel, ProgramCreationAttributes, ProgramUpdateAttributes } from '../../database/models/program.model';
import { NotFoundError } from '../../errors/http.errors';
import { DatabaseUtils } from '../../utils/database.util';

export class ProgramsService {
  public static async findAll(pagination: { page: number; limit: number }, search?: string) {
    return ProgramModel.findAll({
      attributes: ['id', 'name'],
      ...DatabaseUtils.getPaginationConfig(pagination),
      ...DatabaseUtils.getSearchConfig('name', search),
    });
  }

  public static async findById(id: number): Promise<ProgramModel> {
    const result = ProgramModel.findOne({ attributes: ['id', 'name'], where: { id }, rejectOnEmpty: false });

    if (!result) {
      throw new NotFoundError();
    }

    return result;
  }

  public static async create(program: ProgramCreationAttributes): Promise<{ id: number }> {
    const { id } = await ProgramModel.create(program);

    return { id };
  }

  public static async update(id: number, program: ProgramUpdateAttributes): Promise<ProgramModel> {
    await ProgramModel.update(program, { where: { id }, returning: false });
  }

  public static async delete(id: number): Promise<void> {
    await ProgramModel.destroy({ where: { id }, returning: false });
  }
}
