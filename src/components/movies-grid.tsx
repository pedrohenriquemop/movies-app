import { Movie } from "@/utils/api_types";
import MovieCard from "./MovieCard/movie-card";

interface Props {
  movies: Movie[];
}

const MoviesGrid = ({ movies }: Props) => {
  return (
    <div className="grid max-w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 py-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesGrid;
