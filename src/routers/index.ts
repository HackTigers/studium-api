import { Express } from "express";
import authRouter from "./authRouter";
import postRouter from "./postRouter";
import examRouter from "./examRouter";

export async function registerRouters(app: Express) {
  const routers = [
    { path: "/auth", router: authRouter },
    { path: "/post", router: postRouter },
    { path: "/exam", router: examRouter },
  ];

  for (const { path, router } of routers) {
    app.use(path, router);
  }
}
