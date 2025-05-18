import { ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

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
        <Card key={movie.id} className="w-auto">
          <CardHeader>
            <CardTitle>
              <Link className="hover:underline" href={`/movies/${movie.id}`}>
                {movie.title}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="line-clamp-3">
              {movie.overview}
            </CardDescription>
            {(JSON.parse(movie?.genres.replaceAll("'", '"')) || []).map(
              (genre: { id: string; name: string }) => (
                <Badge key={genre.id} variant="outline" className="mt-1 mr-1">
                  {genre.name}
                </Badge>
              ),
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Badge>{movie.vote_average} / 10</Badge>
            <Link
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="blank"
              className="hover:underline"
            >
              <ExternalLink
                className="mr-0.5 inline align-baseline"
                size={14}
              />
              <span>View on IMDb</span>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MoviesGrid;
