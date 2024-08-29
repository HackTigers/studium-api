import { Express } from "express";
import authRouter from "./authRouter";
import postRouter from "./postRouter";

export async function registerRouters(app: Express) {
  const routers = [
    { path: "/auth", router: authRouter },
    { path: "/post", router: postRouter },
  ];

  for (const { path, router } of routers) {
    app.use(path, router);
  }
}
