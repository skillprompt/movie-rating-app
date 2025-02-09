import { Request, Response, NextFunction } from "express";
import { CreateMovieSchema } from "../../../services/movie-review-validations";
import { InvalidMovieReviewPayload } from "../../../services/movie-review-errors";

import { movieService } from "../../../services/movie";
import { movieMongoService } from "../../../mongo/movie/service";
import { MovieReviewAppError } from "../../../error";
import { verifyToken } from "../../../utils/jwt";

export async function createMovieController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const parsed = CreateMovieSchema.safeParse(body);
    if (!parsed.success) {
      const parseError = parsed.error.flatten();
      const invalidPayloadError = new InvalidMovieReviewPayload(parseError);
      next(invalidPayloadError);
      return;
    }

    if (process.env.DATABASE_TYPE === "MYSQL") {
      movieService.createMovie({
        title: parsed.data.title,
        description: parsed.data.description,
        release_year: parsed.data.release_year,
        genre: parsed.data.genre,
      });
    } else {
      await movieMongoService.createMovie({
        title: parsed.data.title,
        description: parsed.data.description,
        release_year: parsed.data.release_year,
        genre: parsed.data.genre,
      });
    }

    res.json({
      message: "Movie added successfully.",
    });
  } catch (error) {
    if ((error as any).errorResponse?.code === 11000) {
      const movieError = new MovieReviewAppError(
        "Failed to create the movie. Please choose unique title",
        400
      );
      next(movieError);
      return;
    }
    const movieError = new MovieReviewAppError(
      "Failed to create the movie. something went wrong in server.",
      500
    );
    next(movieError);
  }
}
