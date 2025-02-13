import { Express } from "express";
import { signUpController } from "../controllers/auth-controllers/signup-controller";
import { loginController } from "../controllers/auth-controllers/login-controller";
import { logoutController } from "../controllers/auth-controllers/logout-controller";
import { authMiddleware } from "../utils/auth-middleware";

export function createAuthRoutes(app: Express) {
  //mutation
  app.post("/auth/signup", signUpController);
  app.post("/auth/login", loginController);
  app.post("/auth/logout", authMiddleware, logoutController);
}
