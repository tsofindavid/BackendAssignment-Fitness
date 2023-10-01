import { ExerciseModel } from '../../database/models/exercise.model';
import { ProgramModel } from '../../database/models/program.model';

export class ExercisesService {
  public static findAll() {
    return ExerciseModel.findAll({
      include: ProgramModel,
    });
  }
}
