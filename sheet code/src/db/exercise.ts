import { Sequelize, DataTypes } from 'sequelize';
import { DatabaseModel } from '../types/db';
import { ProgramModel } from './program';

import { ExerciseDifficulty } from '../utils/enums';

export class ExerciseModel extends DatabaseModel {
  id: number;
  difficulty: ExerciseDifficulty;
  name: String;

  program: ProgramModel;
}

export default (sequelize: Sequelize) => {
  ExerciseModel.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      difficulty: {
        type: DataTypes.ENUM(...Object.values(ExerciseDifficulty)),
      },
      name: {
        type: DataTypes.STRING(200),
      },
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: 'exercise',
    }
  );

  ExerciseModel.associate = models => {
    (ExerciseModel as any).belongsTo(models.Program, {
      foreignKey: {
        name: 'programID',
        allowNull: false,
      },
    });
  };

  return ExerciseModel;
};
