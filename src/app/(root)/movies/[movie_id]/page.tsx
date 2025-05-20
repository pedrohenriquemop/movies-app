import MovieDetail from "@/components/movie-detail";
import { MovieMetadata } from "@/components/movies-grid";
import data from "../../../../../public/data/movies.json" with { type: "json" };

const Movie = async ({
  params,
}: {
  params: Promise<{
    movie_id: string;
  }>;
}) => {
  const { movie_id } = await params;

  const fetchedMovie = (data as MovieMetadata[]).find(
    (movie) => movie.id === movie_id,
  );

  return (
    <MovieDetail
      movie={fetchedMovie || null}
      {...(!fetchedMovie ? { fallbackId: movie_id } : {})}
    />
  );
};

export default Movie;
