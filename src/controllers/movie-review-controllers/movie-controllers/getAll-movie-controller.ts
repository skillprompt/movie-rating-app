import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie";
import { movieMongoService } from "../../../mongo/movie/service";
export async function getAllMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (process.env.DATABASE_TYPE === "MYSQL") {
    const movies = await movieService.getAllMovie();
    res.json({
      data: movies,
      message: "Movie get all successfully.",
    });
  } else {
    const movies = await movieMongoService.getAllMovie();
    res.json({
      data: movies,
      message: "Movie get all successfully.",
    });
  }
}
