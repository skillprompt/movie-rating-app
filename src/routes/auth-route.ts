import { Express } from "express";
import { signUpController } from "../controllers/auth-controllers/signup-controller";
import { loginController } from "../controllers/auth-controllers/login-controller";

export function createAuthRoutes(app: Express) {
  //mutation
  app.post("/auth/signup", signUpController);
  app.post("/auth/login", loginController);
}
