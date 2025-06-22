"use client";

import { useAuth } from "@/components/contexts/auth-context";
import { useBreadcrumb } from "@/hooks/use-breadcrumb";
import { useEffect } from "react";
import { MovieMetadata } from "./movies-grid";
import { Badge } from "./ui/badge";

interface Props {
  movie: MovieMetadata | null;
  fallbackId?: string;
}

const MovieDetail = ({ movie, fallbackId }: Props) => {
  const { setBreadcrumb } = useBreadcrumb();
  // TODO: implement ratings, that will only be available for logged-in users
  // const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (!movie) {
      if (fallbackId) {
        setBreadcrumb({
          [fallbackId]: "Movie not found",
        });
      }
      return;
    }

    setBreadcrumb({
      [movie.id]: movie.title,
    });
  }, [fallbackId, movie, setBreadcrumb]);

  if (!movie) {
    throw new Error("Movie not found");
  }

  return (
    <div className="flex max-w-[500px] flex-col gap-4">
      <h1 className="text-4xl">{movie.title}</h1>
      <p className="text-accent-foreground">{movie.overview}</p>
      <div>
        {(JSON.parse(movie?.genres.replaceAll("'", '"')) || []).map(
          (genre: { id: string; name: string }) => (
            <Badge
              key={genre.id}
              variant="outline"
              className="mt-1 mr-1 text-2xl"
            >
              {genre.name}
            </Badge>
          ),
        )}
      </div>
      <p className="text-xl">Rating: {movie.vote_average} / 10</p>
    </div>
  );
};

export default MovieDetail;
