import MoviesGrid from "@/components/movies-grid";
import data from "../../../../public/data/movies.json" with { type: "json" };

export default function Movies() {
  const movies = data;

  return (
    <div>
      <h1 className="text-3xl">Movies</h1>
      <MoviesGrid movies={movies} />
    </div>
  );
}
