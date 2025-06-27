"use client";

import { useEffect, useState } from "react";
import MoviesGrid from "@/components/movies-grid";
import { moviesApi } from "@/utils/api";
import { Movie } from "@/utils/api_types";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const limit = 20;

  const fetchMovies = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await moviesApi.getMovies(undefined, page, limit);

      setMovies(response.movies);
      setTotalCount(response.totalCount);
      setTotalPages(Math.ceil(response.totalCount / limit));
      setCurrentPage(page);
    } catch (err: any) {
      console.error("Failed to fetch movies:", err);
      setError(err.message || "Failed to load movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl">Movies</h1>
        <p>Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl">Movies</h1>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl">Movies</h1>
      <MoviesGrid movies={movies} />
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages} ({totalCount} total movies)
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
