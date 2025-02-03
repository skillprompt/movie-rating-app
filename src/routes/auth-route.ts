import { Express } from "express";
import { signUpController } from "../controllers/auth-controllers/signup-controller";

export function createAuthRoutes(app: Express) {
  //mutation
  app.post("/auth/signup", signUpController);
}
