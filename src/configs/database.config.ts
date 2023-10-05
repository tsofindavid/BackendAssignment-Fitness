const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

export class DatabaseConfig {
  public static readonly host: string = DB_HOST || 'localhost';
  public static readonly port: number = DB_PORT ? +DB_PORT : 5432;
  public static readonly database: string = DB_DATABASE;
  public static readonly user: string = DB_USERNAME;
  public static readonly password: string = DB_PASSWORD;
}
