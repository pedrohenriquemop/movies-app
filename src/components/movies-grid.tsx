import MovieCard from "./MovieCard/movie-card";

export type MovieMetadata = {
  title: string;
  adult: string;
  belongs_to_collection: string | null;
  budget: string;
  genres: string;
  homepage: string | null;
  id: string;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  vote_count: number;
  vote_average: number;
};

interface Props {
  movies: MovieMetadata[];
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
