"use client";

import { useEffect, useState } from "react";
import MovieDetail from "@/components/movie-detail";
import { moviesApi } from "@/utils/api";
import { Movie } from "@/utils/api_types";
const MoviePage = ({
  params,
}: {
  params: Promise<{
    movie_id: string;
  }>;
}) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const resolvedParams = await params;
      const { movie_id } = resolvedParams;
      const numericMovieId = parseInt(movie_id);

      if (isNaN(numericMovieId)) {
        setError("Invalid movie ID format.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // There's no endpoint to get a movie by id (not yet at least), so we fetch all movies and find the one with the matching id
        const response = await moviesApi.getMovies(undefined, 1, 1000);
        const foundMovie = response.movies.find((m) => m.id === numericMovieId);

        if (foundMovie) {
          setMovie(foundMovie);
        } else {
          setError("Movie not found.");
        }
      } catch (err: any) {
        console.error("Failed to fetch movie:", err);
        setError(err.message || "Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [params]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Movie not found.</p>
      </div>
    );
  }

  return <MovieDetail movie={movie} />;
};

export default MoviePage;
