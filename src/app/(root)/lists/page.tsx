"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/components/contexts/auth-context";
import { useRouter } from "next/navigation";
import { MovieList } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Trash2Icon, FilmIcon, PlusIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MovieMetadata } from "@/components/movies-grid";
import Link from "next/link";
import moviesData from "../../../../public/data/movies.json";
import { useNotification } from "@/hooks/use-notification";

const ListsPage = () => {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const { notify } = useNotification();
  const [lists, setLists] = useState<MovieList[]>([]);
  const [newListName, setNewListName] = useState("");
  const [loading, setLoading] = useState(true);

  const allMovies: MovieMetadata[] = moviesData as MovieMetadata[];

  const fetchLists = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/lists?userId=${user.id}`);
      if (response.ok) {
        const data: MovieList[] = await response.json();
        setLists(data);
      } else {
        notify("Failed to fetch lists.", { type: "error" });
      }
    } catch {
      notify("Network error fetching lists.", { type: "error" });
    } finally {
      setLoading(false);
    }
  }, [user, notify]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
      return;
    }
    fetchLists();
  }, [isLoggedIn, router, fetchLists]);

  const handleCreateList = async () => {
    if (!user?.id) return;
    if (!newListName.trim()) {
      notify("List name cannot be empty.", { type: "warning" });
      return;
    }
    try {
      const response = await fetch("/api/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newListName, userId: user.id }),
      });

      if (response.ok) {
        const newList: MovieList = await response.json();
        setLists((prev) => [...prev, newList]);
        setNewListName("");
        notify(`List "${newList.name}" created successfully!`, {
          type: "success",
        });
      } else {
        notify("Failed to create list.", { type: "error" });
      }
    } catch {
      notify("Network error creating list.", { type: "error" });
    }
  };

  const handleDeleteList = async (listId: string) => {
    if (!user?.id) return;
    try {
      const response = await fetch(`/api/lists/${listId}?userId=${user.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setLists((prev) => prev.filter((list) => list.id !== listId));
        notify("List deleted successfully!", { type: "success" });
      } else {
        notify("Failed to delete list.", { type: "error" });
      }
    } catch {
      notify("Network error deleting list.", { type: "error" });
    }
  };

  const handleRemoveMovieFromList = async (listId: string, movieId: string) => {
    if (!user?.id) return;
    try {
      const response = await fetch(
        `/api/lists/${listId}/movies?userId=${user.id}&movieId=${movieId}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setLists((prev) =>
          prev.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  movieIds: list.movieIds.filter((id) => id !== movieId),
                }
              : list,
          ),
        );
        notify("Movie removed from list.", { type: "info" });
      } else {
        notify("Failed to remove movie from list.", { type: "error" });
      }
    } catch {
      notify("Network error removing movie.", { type: "error" });
    }
  };

  if (!isLoggedIn || !user) {
    return <h1 className="text-3xl text-red-500">Redirecting to login...</h1>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl">My Lists</h1>

      <div className="flex max-w-lg items-center space-x-2">
        <Input
          placeholder="Create new list..."
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleCreateList}>
          <PlusIcon className="h-4 w-4" /> Create List
        </Button>
      </div>

      {loading ? (
        <p>Loading your lists...</p>
      ) : lists.length === 0 ? (
        <p className="text-md text-gray-500">
          You haven&apos;t created any lists yet. Start by creating one above!
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 py-4">
          {lists.map((list) => (
            <Card key={list.id} className="flex w-auto flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-semibold">
                  {list.name}
                </CardTitle>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-7 w-7"
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your list.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteList(list.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardHeader>
              <CardContent className="flex-grow">
                {list.movieIds.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No movies in this list yet.
                  </p>
                ) : (
                  <ul className="mt-2 space-y-2">
                    {list.movieIds.map((movieId) => {
                      const movie = allMovies.find((m) => m.id === movieId);
                      return movie ? (
                        <li
                          key={movieId}
                          className="flex items-center justify-between rounded-md bg-slate-50 p-2 text-sm shadow-sm dark:bg-slate-800"
                        >
                          <Link
                            href={`/movies/${movie.id}`}
                            className="flex items-center gap-2 hover:underline"
                          >
                            <FilmIcon className="h-4 w-4 text-gray-500" />
                            {movie.title}
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleRemoveMovieFromList(list.id, movieId)
                            }
                            className="h-6 w-6 text-red-500 hover:bg-red-500/10"
                            title="Remove from list"
                          >
                            <Trash2Icon className="h-3.5 w-3.5" />
                          </Button>
                        </li>
                      ) : (
                        <li key={movieId} className="text-sm text-gray-500">
                          Movie ID: {movieId} (Not Found)
                        </li>
                      );
                    })}
                  </ul>
                )}
              </CardContent>
              <CardFooter className="pt-4 text-sm text-gray-600 dark:text-gray-400">
                {list.movieIds.length} movies
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListsPage;
