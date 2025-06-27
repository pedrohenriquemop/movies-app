"use client";

import MoviesGrid from "@/components/movies-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { moviesApi } from "@/utils/api";
import { Movie } from "@/utils/api_types";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const limit = 20;

  const fetchMovies = async (searchTerm: string, page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await moviesApi.getMovies(searchTerm || "", page, limit);

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
    fetchMovies(searchTerm, currentPage);
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

  const handleSearch = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
      return;
    }

    fetchMovies(searchTerm, 1);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="mt-4">
          <p>Loading movies...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="mt-4">
          <p className="text-red-500">Error: {error}</p>
        </div>
      );
    }

    return (
      <>
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
      </>
    );
  };

  return (
    <div>
      <h1 className="text-3xl">Movies</h1>
      <div className="mt-2 flex w-full items-center justify-between gap-2">
        <Input
          placeholder="Search for movie title..."
          value={searchTerm}
          onInput={(e) => {
            const value = (e.target as HTMLInputElement).value;
            setSearchTerm(value.trim());
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }

            if (e.key === "Escape") {
              setSearchTerm("");
              handleSearch();
            }
          }}
        ></Input>
        <Button variant="secondary" onClick={handleSearch}>
          <Search className="h-4 w-4" />
        </Button>
      </div>
      {renderContent()}
    </div>
  );
}
