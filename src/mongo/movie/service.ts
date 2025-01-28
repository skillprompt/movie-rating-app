import { MovieModel } from "./model";

type TMovie = {
  id: string;
  title: string;
  description: string;
  release_year: number;
  genre: string;
};

async function createMovie(input: Omit<TMovie, "id">) {
  const movie = new MovieModel({
    title: input.title,
    genre: input.genre,
    description: input.description,
    release_year: input.release_year,
  });

  await movie.save();

  return movie;
}

async function updateMovie(toUpdateMovieId: string, input: Omit<TMovie, "id">) {
  const movie = await MovieModel.findById(toUpdateMovieId);

  if (!movie) {
    throw new Error("movie not found!");
  }

  // await MovieModel.replaceOne(
  //   { _id: toUpdateMovieId },
  //   {
  //     title: input.title,
  //     description: input.description,
  //     genre: input.genre,
  //     release_year: input.release_year,
  //   }
  // );

  await MovieModel.updateOne(
    {
      _id: toUpdateMovieId,
    },
    {
      title: input.title,
      description: input.description,
      genre: input.genre,
      release_year: input.release_year,
    }
  );
}

export const movieMongoService = {
  createMovie,
  updateMovie,
};
