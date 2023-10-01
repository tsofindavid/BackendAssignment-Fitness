import express, { json, RequestHandler, urlencoded } from 'express';
import http from 'http';
import Routes from './routes';
import AppConfig from './configs/app.config';
import { DatabaseConnection } from './database/database-connection';

class App {
  public static async init(): Promise<void> {
    await DatabaseConnection.init();

    const app = express();

    app.use(urlencoded({ extended: true }) as RequestHandler);
    app.use(json() as RequestHandler);

    app.use('/api/v1', Routes.routerV1);

    const httpServer = http.createServer(app);

    httpServer.listen(AppConfig.port).on('listening', () => console.log(`Server started at port ${AppConfig.port}`));
  }
}

App.init().catch(({ message }) => {
  console.error(`Start App Error: ${message}`);
});
