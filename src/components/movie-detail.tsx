"use client";

import { useBreadcrumb } from "@/hooks/use-breadcrumb";
import { useEffect, useState } from "react";
import { MovieMetadata } from "./movies-grid";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useAuth } from "@/components/contexts/auth-context";
import AddToListDialog from "./add-to-list-dialog";

interface Props {
  movie: MovieMetadata | null;
  fallbackId?: string;
}

const MovieDetail = ({ movie, fallbackId }: Props) => {
  const { setBreadcrumb } = useBreadcrumb();
  const { isLoggedIn, user } = useAuth();
  const [showAddToListDialog, setShowAddToListDialog] = useState(false);

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

      {isLoggedIn && user && (
        <Button
          onClick={() => setShowAddToListDialog(true)}
          className="mt-4 w-fit"
        >
          Add to List
        </Button>
      )}

      {movie && isLoggedIn && user && (
        <AddToListDialog
          isOpen={showAddToListDialog}
          onClose={() => setShowAddToListDialog(false)}
          movieId={movie.id}
          userId={user.id}
        />
      )}
    </div>
  );
};

export default MovieDetail;
