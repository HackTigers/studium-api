import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";
import cors from "cors";
import "reflect-metadata";

import { initializeDatabase } from "./database/database";
import { registerRouters } from "./routers";
import { bindLogger } from "./utils/logging";
import { validateEnv } from "./utils/validation";

import constants from "./utils/constants";
import swaggerDocument from "../swagger.json";
import { validationMiddleware } from "./middleware/validation";
const app = express();
const port = constants.PORT;

async function initializeApp() {
  app.use(
    bodyParser.json({
      verify: (req, res, buf, encoding) => {
        try {
          JSON.parse(buf.toString());
        } catch (e) {
          res.statusCode = 400;
          res.setHeader("content-type", "application/json");
          res.write(
            JSON.stringify({
              message: "Invalid JSON",
              success: false,
            })
          );
          res.end();
        }
      },
    })
  );

  app.use(validationMiddleware);
  app.use(cors());
  if (!validateEnv()) {
    console.log(`Please fix the environment variables and try again`);
    process.exit(1);
  }
  bindLogger();
  console.info("Studium API is starting...");
  await initializeDatabase();
  await registerRouters(app);

  app.get("/", (_: Request, res: Response) => {
    res.json({
      message: "Studium API is running",
      success: true,
    });
  });
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.listen(port, () =>
    console.info(`Server running at http://localhost:${port}`)
  );
}

initializeApp();

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception thrown", error);
});
