import { ProgramModel } from '../../database/models/program.model';

export class ProgramsService {
  public static async findAll() {
    return ProgramModel.findAll({
      raw: false,
    });
  }
}
