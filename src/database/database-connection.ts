import { Sequelize } from 'sequelize-typescript';
import AppConfig from '../configs/app.config';
import { NodeEnv } from '../enums/app.enum';
import DatabaseConfig from '../configs/database.config';

export class DatabaseConnection {
  private static _connection: Sequelize;

  public static get connection(): Sequelize {
    return DatabaseConnection._connection;
  }

  public static init(): void {
    const { user, port, password, host, database } = DatabaseConfig;

    this._connection = new Sequelize({
      host: host,
      username: user,
      port: port,
      password,
      database,
      logging: AppConfig.nodeEnv === NodeEnv.DEVELOPMENT ? console.log : undefined,
      dialect: 'postgres',
      models: [__dirname + '/models/*.model.{js,ts}'],
      // replace '.' or '-' with an empty string to match file name with model name
      modelMatch: (filename, member) => filename.replaceAll(/\-|\./gi, '') === member.toLowerCase(),
    });
  }
}
