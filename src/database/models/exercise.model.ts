import { Column, DataType, BelongsTo, Model, Table, ForeignKey } from 'sequelize-typescript';
import { ProgramModel } from './program.model';
import { ExerciseDifficulty } from '../../enums/exercise.enums';

export interface Exercise {
  id: number;
  name: string;
  difficulty: ExerciseDifficulty;
  password: string;
}

export interface ExerciseCreationAttributes extends Omit<Exercise, 'id'> {}

@Table({ tableName: 'exercise', underscored: true })
export class ExerciseModel extends Model<Exercise, ExerciseCreationAttributes> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false, values: Object.values(ExerciseDifficulty) })
  difficulty: ExerciseDifficulty;

  @ForeignKey(() => ProgramModel)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  programId: number;

  @BelongsTo(() => ProgramModel)
  program: ProgramModel;
}
