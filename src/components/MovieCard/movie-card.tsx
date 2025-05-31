import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { MovieMetadata } from "../movies-grid";

interface MovieCardProps {
  movie: MovieMetadata;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
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
          <ExternalLink className="mr-0.5 inline align-baseline" size={14} />
          <span>View on IMDb</span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
