import MovieDetail from "@/components/movie-detail";
import { MovieMetadata } from "@/components/movies-grid";
import data from "../../../../../public/data/movies.json" with { type: "json" };

const Movie = ({
  params,
}: {
  params: {
    movie_id: string;
  };
}) => {
  const fetchedMovie = (data as MovieMetadata[]).find(
    (movie) => movie.id === params.movie_id,
  );

  return (
    <MovieDetail
      movie={fetchedMovie || null}
      {...(!fetchedMovie ? { fallbackId: params.movie_id } : {})}
    />
  );
};

export default Movie;
