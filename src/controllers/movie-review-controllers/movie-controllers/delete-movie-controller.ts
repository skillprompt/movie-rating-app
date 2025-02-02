import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie";
import {
  InvalidMovieReviewPayload,
  MovieNotFound,
} from "../../../services/movie-review-errors";
import { MovieReviewAppError } from "../../../error";
import { movieMongoService } from "../../../mongo/movie/service";

export async function deleteMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movieId = req.params.movieId;
    if (!movieId) {
      const invalidPayLoadError = new InvalidMovieReviewPayload(movieId);
      next(invalidPayLoadError);
      return;
    }

    if (process.env.DATABASE_TYPE === "MYSQL") {
      const movieIdNum = Number(movieId);
      const movie = movieService.getByIdMovie(Number(movieIdNum));
      if (!movie) {
        const movieNotFoundError = new MovieNotFound();
        next(movieNotFoundError);
        return;
      }
      movieService.deleteMovie(movieIdNum);
    } else {
      await movieMongoService.deleteMovie(movieId);
    }

    res.json({
      message: "Movie deleted successfully.",
    });
  } catch (error) {
    const movieError = new MovieReviewAppError("Not found the MoviewID", 500);
    next(movieError);
  }
}
