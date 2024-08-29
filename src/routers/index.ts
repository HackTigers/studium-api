import { Express } from "express";
import loginRouter from "./loginRouter";
import postRouter from "./postRouter";

export async function registerRouters(app: Express) {
  const routers = [
    { path: "/login", router: loginRouter },
    { path: "/post", router: postRouter },
  ];

  for (const { path, router } of routers) {
    app.use(path, router);
  }
}
