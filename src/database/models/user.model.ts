import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { UserRole } from '../../enums/user.enums';

export interface User {
  id: number;
  role: UserRole;
  name: string;
  surname: string;
  nickname: string;
  email: string;
  age: number;
  password: string;
}

export interface UserCreationAttributes extends Optional<User, 'id'> {}

@Table({ tableName: 'users', underscored: true })
export class UserModel extends Model<User, UserCreationAttributes> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;

  @Column({ type: DataType.STRING, primaryKey: true, allowNull: false })
  nickname: string;

  @Column({ type: DataType.STRING, primaryKey: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false, values: ['ADMIN', 'USER'] })
  role: UserRole;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
}
