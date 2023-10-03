import express, { json, RequestHandler, urlencoded } from 'express';
import { routerV1 } from './routes';
import { AppConfig } from './configs/app.config';
import { DatabaseConnection } from './database/database-connection';
import { LoggerMiddleware } from './middlewares/logger.middleware';

class App {
  public static async init(): Promise<void> {
    await DatabaseConnection.init();

    const app = express();

    app.use(urlencoded({ extended: true }) as RequestHandler);
    app.use(json() as RequestHandler);
    app.use(LoggerMiddleware);

    app.use('/api/v1', routerV1);

    app.listen(AppConfig.port).on('listening', () => console.log(`Server started at port ${AppConfig.port}`));
  }
}

App.init().catch(({ message }) => {
  console.error(`Start App Error: ${message}`);
});
