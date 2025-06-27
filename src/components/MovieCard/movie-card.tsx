import { Movie } from "@/utils/api_types";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Card key={movie.id} className="flex w-auto max-w-[300] flex-col">
      {" "}
      <CardHeader>
        {" "}
        <CardTitle className="text-xl">
          {" "}
          <Link
            className="text-2xl hover:underline"
            href={`/movies/${movie.id}`}
          >
            {movie.title}
          </Link>
          {movie.releaseYear && (
            <span
              className="text-secondary block"
              data-testid="movie-card-release-year"
            >
              {movie.releaseYear}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col items-center gap-4">
        {" "}
        {movie?.posterUrl && !imageError ? (
          <div
            className="relative w-full overflow-hidden rounded-md"
            style={{ aspectRatio: "2/3" }}
          >
            <Image
              src={`${movie.posterUrl}`}
              alt={movie.title || "Movie Poster"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              onError={() => setImageError(true)}
              priority
            />
          </div>
        ) : (
          <div
            className="relative flex w-full flex-col items-center justify-center gap-2 rounded-md bg-gray-200 text-gray-500"
            style={{ aspectRatio: "2/3" }}
          >
            <ImageOff size={48} className="text-gray-400" />
            <span className="text-center text-sm font-medium">
              No Poster Available
            </span>{" "}
          </div>
        )}
        <CardDescription
          className="mb-4 line-clamp-3 text-sm"
          data-slot="card-description"
        >
          {" "}
          {movie.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="pv-0 flex items-center justify-between">
        <Button>
          <Link href={`/movies/${movie.id}`}>View Details and Ratings</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
