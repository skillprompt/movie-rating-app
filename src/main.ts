import express, { NextFunction, Request, Response } from "express";
import { homeController } from "./controllers/home-controller";
import { createMovieRoute } from "./routes/movie-route";
import { AppError } from "./error";
import fs from "fs";
import { createReviewRoute } from "./routes/review-route";

const app = express();

// json parser
app.use(express.json());

app.get("/", homeController);

// movies routes
createMovieRoute(app);

// reviews routes
createReviewRoute(app);

// global error handler
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error("Caught error:::", error);
  res.status(error.status || 500).json({
    message: error.message,
    meta: error.meta,
  });
});

app.listen(4001, () => {
  console.log("Server started on http://localhost:4001");
});
