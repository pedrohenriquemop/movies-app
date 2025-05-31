"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusIcon, ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MovieList } from "@/lib/mock-data";

interface AddToListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: string;
  userId: string;
}

const AddToListDialog = ({
  isOpen,
  onClose,
  movieId,
  userId,
}: AddToListDialogProps) => {
  const [userLists, setUserLists] = useState<MovieList[]>([]);
  const [newListName, setNewListName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserLists = async () => {
      if (!userId || !isOpen) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setMessage("");
      try {
        const response = await fetch(`/api/lists?userId=${userId}`);
        if (response.ok) {
          const lists: MovieList[] = await response.json();
          setUserLists(lists);
        } else {
          setMessage("Failed to fetch lists.");
        }
      } catch {
        setMessage("Network error fetching lists.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserLists();
  }, [userId, isOpen]);

  const handleCreateList = async () => {
    if (!userId) return;
    if (!newListName.trim()) {
      setMessage("List name cannot be empty.");
      return;
    }
    setMessage("");
    try {
      const response = await fetch("/api/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newListName, userId }),
      });

      if (response.ok) {
        const newList: MovieList = await response.json();
        setUserLists((prev) => [...prev, newList]);
        setNewListName("");
        setMessage(`List "${newList.name}" created successfully!`);
      } else {
        setMessage("Failed to create list.");
      }
    } catch {
      setMessage("Network error creating list.");
    }
  };

  const handleAddMovieToList = async (listId: string, listName: string) => {
    if (!userId) return;
    setMessage("");
    try {
      const response = await fetch(`/api/lists/${listId}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId, userId }), // Pass userId in body
      });

      if (response.ok) {
        setMessage(`Movie added to "${listName}" successfully!`);
        onClose();
      } else {
        setMessage("Failed to add movie to list.");
      }
    } catch {
      setMessage("Network error adding movie to list.");
    }
  };

  if (!userId) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add to List</DialogTitle>
          <DialogDescription>
            Add this movie to one of your existing lists or create a new one.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {message && (
            <p className="text-center text-sm text-red-500">{message}</p>
          )}
          <div className="flex items-center space-x-2">
            <Input
              placeholder="New list name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleCreateList}>
              <PlusIcon className="mr-2 h-4 w-4" /> Create
            </Button>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-md mb-2 font-semibold">Your Lists</h3>
            {isLoading ? (
              <p>Loading lists...</p>
            ) : userLists.length === 0 ? (
              <p className="text-sm text-gray-500">
                No lists found. Create one above!
              </p>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Select a List <ChevronDownIcon className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                  {userLists.map((list) => (
                    <DropdownMenuItem
                      key={list.id}
                      onClick={() => handleAddMovieToList(list.id, list.name)}
                    >
                      {list.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToListDialog;
