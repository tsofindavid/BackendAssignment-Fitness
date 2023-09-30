import { NodeEnv } from '../enums/app.enum';

const { PORT, NODE_ENV } = process.env;

export default class AppConfig {
  public static readonly port: number = PORT ? +PORT : 8000;
  public static readonly nodeEnv: NodeEnv = NODE_ENV as NodeEnv;
}
