import {
  ExerciseCreationAttributes,
  ExerciseModel,
  ExerciseUpdateAttributes,
} from '../../database/models/exercise.model';
import { NotFoundError } from '../../errors/http.errors';
import UserExerciseModel from '../../database/models/user-execise.model';
import {
  ExerciseAlreadyCompletedError,
  ExerciseAlreadyStartedError,
  ExerciseNotStartedError,
} from '../../errors/exercise.errors';
import { DatabaseUtils } from '../../utils/database.util';

export class ExercisesService {
  public static async findAll(pagination: { page: number; limit: number }, search?: string): Promise<ExerciseModel[]> {
    return ExerciseModel.findAll({
      ...DatabaseUtils.getPaginationConfig(pagination),
      ...DatabaseUtils.getSearchConfig('name', search),
    });
  }

  public static async findById(id: number): Promise<ExerciseModel> {
    const result = await ExerciseModel.findOne({
      rejectOnEmpty: false,
      where: { id },
    });

    if (!result) {
      throw new NotFoundError();
    }

    return result;
  }

  public static async findByProgramId(
    programId: number,
    pagination: { page: number; limit: number },
    search?: string
  ): Promise<ExerciseModel[]> {
    const result = await ExerciseModel.findAll({
      rejectOnEmpty: false,
      where: { programId },
      attributes: ['id', 'name', 'difficulty', 'programId'],
      ...DatabaseUtils.getPaginationConfig(pagination),
      ...DatabaseUtils.getSearchConfig('name', search),
    });

    if (!result) {
      throw new NotFoundError();
    }

    return result;
  }

  public static async start(exerciseId: number, userId: number): Promise<void> {
    const userExercise = await UserExerciseModel.findOne({ rejectOnEmpty: false, where: { exerciseId, userId } });

    if (userExercise) {
      throw new ExerciseAlreadyStartedError();
    }

    await UserExerciseModel.create({
      exerciseId,
      userId,
      startTime: new Date.now(),
    });
  }

  public static async completed(exerciseId: number, userId: number): Promise<void> {
    const userExercise = await UserExerciseModel.findOne({ rejectOnEmpty: false, where: { exerciseId, userId } });

    if (!userExercise) {
      throw new ExerciseNotStartedError();
    }

    if (userExercise.completedTime) {
      throw new ExerciseAlreadyCompletedError();
    }

    await UserExerciseModel.update(
      { completedTime: new Date.now() },
      {
        returning: false,
        where: {
          exerciseId,
          userId,
        },
      }
    );
  }

  public static async create(exercise: ExerciseCreationAttributes): Promise<{ id: number }> {
    const { id } = await ExerciseModel.create(exercise);

    return { id };
  }

  public static async update(id: number, exercise: ExerciseUpdateAttributes): Promise<void> {
    await ExerciseModel.update(exercise, { returning: false, where: { id } });
  }

  public static async delete(id: number): Promise<void> {
    await ExerciseModel.destroy({ returning: false, where: { id } });
  }
}
