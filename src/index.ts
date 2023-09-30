import express, { json, RequestHandler, urlencoded } from 'express';
import http from 'http';
import routes from './router';
import AppConfig from './configs/app.config';
import { DatabaseConnection } from './database/database-connection';

class App {
  public static async init(): Promise<void> {
    await DatabaseConnection.init();

    await DatabaseConnection.connection.sync();

    const app = express();

    app.use(urlencoded({ extended: true }) as RequestHandler);
    app.use(json() as RequestHandler);

    routes(app);

    const httpServer = http.createServer(app);

    httpServer.listen(AppConfig.port).on('listening', () => console.log(`Server started at port ${AppConfig.port}`));
  }
}

App.init().catch(({ message }) => {
  console.error(`Start App Error: ${message}`);
});
