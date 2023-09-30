import { Sequelize, DataTypes } from 'sequelize';
import { DatabaseModel } from '../types/db';

export class UsersModel extends DatabaseModel {
  id: number;
  name: string;
  surname: string;
  nickName: string;
  email: string;
  age: number;
  password: string;
}

export default (sequelize: Sequelize) => {
  UsersModel.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      nickName: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(100),
        values: ['ADMIN', 'USER]'],
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
      sequelize,
      modelName: 'users',
    }
  );

  return UsersModel;
};
