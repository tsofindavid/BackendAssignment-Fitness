import { Column, DataType, BelongsTo, Model, Table, ForeignKey } from 'sequelize-typescript';
import { EnumDataType, Optional } from 'sequelize';
import { ProgramModel } from './program.model';
import { ExerciseDifficulty } from '../../enums/exercise.enums';

export interface Exercise {
  id: number;
  name: string;
  difficulty: ExerciseDifficulty;
  programId: number;
}

export interface ExerciseCreationAttributes extends Optional<Exercise, 'id'> {}
export interface ExerciseUpdationAttributes extends Optional<Exercise, 'id'> {}

@Table({ tableName: 'exercises', underscored: true })
export class ExerciseModel extends Model<Exercise, ExerciseCreationAttributes> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({
    type: DataType.ENUM({ values: Object.values(ExerciseDifficulty as Record<string, string>) }),
    allowNull: false,
  })
  difficulty: ExerciseDifficulty;

  @ForeignKey(() => ProgramModel)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  programId: number;

  @BelongsTo(() => ProgramModel)
  program: ProgramModel;
}
