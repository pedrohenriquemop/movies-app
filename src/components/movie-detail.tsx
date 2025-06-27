"use client";

import { useAuth } from "@/components/contexts/auth-context";
import { useBreadcrumb } from "@/hooks/use-breadcrumb";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Movie } from "@/utils/api_types";
import Image from "next/image";
import { ImageOff } from "lucide-react";

interface Props {
  movie: Movie | null;
  fallbackId?: string;
}

const MovieDetail = ({ movie, fallbackId }: Props) => {
  const [imageError, setImageError] = useState(false);
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
      <p className="text-secondary -mt-4 text-2xl">{movie.releaseYear}</p>
      <p className="text-accent-foreground">{movie.description}</p>
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
    </div>
  );
};

export default MovieDetail;
