import { Request, Response, NextFunction } from "express";
import { movieService } from "../../../services/movie";
import {
  InvalidMovieReviewPayload,
  MovieNotFound,
} from "../../../services/movie-review-errors";
import { MovieReviewAppError } from "../../../error";
import { movieMongoService } from "../../../mongo/movie/service";
export async function getMovieByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const movieId = req.params.movieId;

    if (process.env.DATABASE_TYPE === "MYSQL") {
      const movieIdNum = Number(movieId);
      const movie = await movieService.getByIdMovie(movieIdNum);
      if (!movieIdNum) {
        const invalidPayloadError = new InvalidMovieReviewPayload(movieIdNum);
        next(invalidPayloadError);
        return;
      }

      if (!movie) {
        const movieNotFoundError = new MovieNotFound();
        next(movieNotFoundError);
        return;
      }
      res.json({
        data: movie,
        message: "Movie get successfully",
      });
    } else {
      const movie = await movieMongoService.getByIdMovie(movieId);

      if (!movie) {
        const movieNotFoundError = new MovieNotFound();
        next(movieNotFoundError);
        return;
      }

      res.json({
        data: movie,
        message: "Movie get successfully",
      });
    }
  } catch (error) {
    const movieError = new MovieReviewAppError(
      "Failed to give the movie. something went wrong in server.",
      500
    );
    next(movieError);
  }
}
