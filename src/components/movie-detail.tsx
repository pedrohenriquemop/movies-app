"use client";

import { useAuth } from "@/components/contexts/auth-context";
import { useBreadcrumb } from "@/hooks/use-breadcrumb";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

import { useNotification } from "@/hooks/use-notification";
import { ratingsApi, tokenManager } from "@/utils/api";
import { Movie, Rating } from "@/utils/api_types";
import { Badge } from "./ui/badge";

interface Props {
  movie: Movie | null;
  fallbackId?: string;
}

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetail = ({ movie, fallbackId }: Props) => {
  const [imageError, setImageError] = useState(false);
  const { setBreadcrumb } = useBreadcrumb();
  const { isLoggedIn, user } = useAuth();
  const { notify } = useNotification();

  const [ratingValue, setRatingValue] = useState<number | "">("");
  const [reviewText, setReviewText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [movieRatings, setMovieRatings] = useState<Rating[]>([]);
  const [ownRating, setOwnRating] = useState<Rating | null>(null);
  const [ratingsLoading, setRatingsLoading] = useState<boolean>(true);
  const [ratingsError, setRatingsError] = useState<string | null>(null);

  const fetchMovieRatings = useCallback(async (movieId: number) => {
    setRatingsLoading(true);
    setRatingsError(null);
    try {
      const ratings = await ratingsApi.getRatingsByMovieId(movieId);
      const ownRating =
        ratings.find((rating) => rating.userId === user?.id) || null;
      setMovieRatings(ratings);
      setOwnRating(ownRating);
    } catch (error: unknown) {
      console.error("Error fetching movie ratings:", error);
      setRatingsError(
        (error as Error).message || "Failed to load movie ratings.",
      );
    } finally {
      setRatingsLoading(false);
    }
  }, []);

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

    if (movie.id && isLoggedIn) {
      fetchMovieRatings(movie.id);
    }
  }, [fallbackId, movie, setBreadcrumb, fetchMovieRatings, isLoggedIn]);

  if (!movie) {
    throw new Error("Movie not found");
  }

  const handleImageError = () => {
    setImageError(true);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setRatingValue("");
    } else {
      const num = parseInt(value, 10);
      if (!isNaN(num) && num >= 0 && num <= 10) {
        setRatingValue(num);
      } else if (value.length <= 2) {
        setRatingValue(value as unknown as number);
      }
    }
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleSubmitRating = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn || !user || typeof user.id !== "number") {
      notify("Authentication Required", {
        description: "Please log in to submit a rating.",
        type: "warning",
      });
      return;
    }

    if (
      typeof ratingValue !== "number" ||
      ratingValue < 0 ||
      ratingValue > 10
    ) {
      notify("Invalid Rating", {
        description: "Please provide a rating between 0 and 10.",
        type: "warning",
      });
      return;
    }

    if (reviewText.trim().length === 0) {
      notify("Review Required", {
        description: "Please provide a review for the movie.",
        type: "warning",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const token = tokenManager.getToken();
      if (!token) {
        notify("Error", {
          description: "Authentication token missing. Please log in again.",
          type: "error",
        });
        return;
      }

      const createRatingDto = {
        userId: user.id,
        movieId: movie.id,
        rating: ratingValue,
        review: reviewText,
      };

      await ratingsApi.createRating(createRatingDto, token);

      notify("Rating Submitted!", {
        description: "Your rating and review have been successfully added.",
        type: "success",
      });

      setRatingValue("");
      setReviewText("");

      if (movie.id) {
        await fetchMovieRatings(movie.id);
      }
    } catch (error: unknown) {
      console.error("Error submitting rating:", error);
      notify("Submission Failed", {
        description:
          (error as Error).message ||
          "There was an error submitting your rating.",
        type: "warning",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const posterPath = movie.posterUrl
    ? `${TMDB_IMAGE_BASE_URL}${movie.posterUrl}`
    : null;

  return (
    <div className="flex max-w-[500px] flex-col gap-4">
      <h1 className="text-4xl">{movie.title}</h1>
      <p className="text-secondary -mt-4 text-2xl">{movie.releaseYear}</p>
      {posterPath && !imageError ? (
        <div
          className="relative w-full overflow-hidden rounded-md"
          style={{ aspectRatio: "2/3" }}
        >
          <Image
            src={posterPath}
            alt={movie.title || "Movie Poster"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            onError={handleImageError}
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
      <p className="text-accent-foreground">{movie.description}</p>

      {isLoggedIn && !ownRating && (
        <div className="mt-8 rounded-lg border p-4 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">Submit Your Rating</h2>
          <form onSubmit={handleSubmitRating} className="flex flex-col gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="rating">Rating (0-10)</Label>
              <Input
                type="number"
                id="rating"
                placeholder="e.g., 8"
                min="0"
                max="10"
                step="1"
                value={ratingValue}
                onChange={handleRatingChange}
                disabled={isSubmitting}
                className="w-full"
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="review">Your Review</Label>
              <Textarea
                placeholder="Share your thoughts on the movie..."
                id="review"
                value={reviewText}
                onChange={handleReviewChange}
                disabled={isSubmitting}
                className="min-h-[100px] resize-y"
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Rating"}
            </Button>
          </form>
        </div>
      )}

      {!isLoggedIn && (
        <div className="mt-8 rounded-lg border bg-gray-50 p-4 text-center text-gray-600">
          <p>Please log in to submit a rating and review for this movie.</p>
        </div>
      )}

      {isLoggedIn && (
        <div className="mt-8 rounded-lg border p-4 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">
            Reviews
            {movieRatings?.length && (
              <span className="text-secondary ml-2">{movieRatings.length}</span>
            )}
          </h2>
          {ownRating && (
            <div key={ownRating.id} className="border-b pb-3 last:border-b-0">
              <div className="mb-1 flex items-center justify-between">
                <p className="text-lg font-semibold">
                  Your review
                  <span className="mt-1 ml-1 text-sm text-gray-500">
                    {new Date(ownRating.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <Badge variant="secondary" className="text-base">
                  {ownRating.rating} / 10
                </Badge>
              </div>
              <p className="text-gray-700">{ownRating.review}</p>
            </div>
          )}
          {ratingsLoading && <p>Loading reviews...</p>}
          {ratingsError && (
            <p className="text-red-500">
              Error loading reviews: {ratingsError}
            </p>
          )}
          {!ratingsLoading && !ratingsError && movieRatings.length === 0 && (
            <p className="text-gray-600">
              No reviews yet. Be the first to rate this movie!
            </p>
          )}
          <div className="flex flex-col gap-4">
            {movieRatings
              .filter((rating) => rating.userId !== user?.id)
              .map((rating) => (
                <div key={rating.id} className="border-b pb-3 last:border-b-0">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="text-lg font-semibold">
                      User ID: {rating.userId}
                      <span className="mt-1 ml-1 text-sm text-gray-500">
                        {new Date(rating.createdAt).toLocaleDateString()}
                      </span>
                    </p>
                    <Badge variant="secondary" className="text-base">
                      {rating.rating} / 10
                    </Badge>
                  </div>
                  <p className="text-gray-700">{rating.review}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
