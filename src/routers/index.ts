import { Express } from "express";
import loginRouter from "./loginRouter";
import postRouter from "./postRouter";

export async function registerRouters(app: Express) {
  const routers = [loginRouter, postRouter];
  for(const router of routers) {
    app.use(router);
  }
}