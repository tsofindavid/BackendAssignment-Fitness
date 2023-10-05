import { Column, DataType, BelongsTo, Model, Table, ForeignKey } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { ProgramModel } from './program.model';
import { ExerciseDifficulty } from '../../enums/exercise.enums';
import { ExerciseModel } from './exercise.model';
import { UserModel } from './user.model';

export interface UserExercise {
  id: number;
  startTime: number;
  completedTime: number;
  exerciseId: number;
  userId: number;
}

export interface UserExerciseCreationAttributes extends Optional<UserExercise, 'id'> {}
export interface UserExerciseUpdationAttributes extends Optional<UserExercise, 'id'> {}

@Table({ tableName: 'user_exercise', underscored: true })
export default class UserExerciseModel extends Model<UserExercise, UserExerciseCreationAttributes> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  startTime: number;

  @Column({ type: DataType.STRING, allowNull: true })
  completedTime: number;

  @ForeignKey(() => ExerciseModel)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  exerciseId: number;

  @BelongsTo(() => ExerciseModel)
  exercise: ExerciseModel;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;
}
