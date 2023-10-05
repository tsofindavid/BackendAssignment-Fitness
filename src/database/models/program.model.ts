import { HasMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ExerciseModel } from './exercise.model';
import { Optional } from 'sequelize';

export interface Program {
  id: number;
  name: string;
}

export interface ProgramCreationAttributes extends Optional<Program, 'id'> {}
export interface ProgramUpdateAttributes extends Optional<Program, 'id'> {}

@Table({ tableName: 'programs', underscored: true })
export class ProgramModel extends Model<Program, ProgramCreationAttributes> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => ExerciseModel)
  exercise: ExerciseModel;
}
