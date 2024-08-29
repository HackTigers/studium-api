import express, { Request, Response } from 'express';
import swaggerUi from "swagger-ui-express";
import dotenv from 'dotenv';

import { initializeDatabase } from "./database/database";
import { registerRouters } from "./routers";
import { bindLogger } from "./utils/logging";
import { validateEnv } from "./utils/validation";

import constants from "./utils/constants";
import swaggerDocument from '../swagger.json';
const app = express();
const port = constants.PORT;

async function initializeApp() {
  dotenv.config();
  if(!validateEnv()) {
      console.log(`Please fix the environment variables and try again`);
      process.exit(1);
  }
  bindLogger();
  await initializeDatabase();
  await registerRouters(app);

  app.get('/', (_: Request, res: Response) => res.send('Studium API is running'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.listen(port, () => console.info(`Server running at http://localhost:${port}`));
}

initializeApp()

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception thrown', error);
});