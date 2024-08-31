import { Express } from "express";
import authRouter from "./authRouter";
import postRouter from "./postRouter";
import examRouter from "./examRouter";
import subjectRouter from "./subjectRouter";
import classRouter from "./classRouter";

export async function registerRouters(app: Express) {
  const routers = [
    { path: "/auth", router: authRouter },
    { path: "/post", router: postRouter },
    { path: "/exam", router: examRouter },
    { path: "/subject", router: subjectRouter },
    { path: "/class", router: classRouter },
  ];

  for (const { path, router } of routers) {
    app.use(path, router);
  }
}
