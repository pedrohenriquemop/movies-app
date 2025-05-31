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
import { MovieList } from "@/lib/mock-data";
import { PlusIcon, ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotification } from "@/hooks/use-notification";

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
  const { notify } = useNotification();
  const [userLists, setUserLists] = useState<MovieList[]>([]);
  const [newListName, setNewListName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserLists = async () => {
      if (!userId || !isOpen) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(`/api/lists?userId=${userId}`);
        if (response.ok) {
          const lists: MovieList[] = await response.json();
          setUserLists(lists);
        } else {
          notify("Failed to fetch lists.", { type: "error" });
        }
      } catch {
        notify("Network error fetching lists.", { type: "error" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserLists();
  }, [userId, isOpen, notify]);

  const handleCreateList = async () => {
    if (!userId) return;
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
        body: JSON.stringify({ name: newListName, userId }),
      });

      if (response.ok) {
        const newList: MovieList = await response.json();
        setUserLists((prev) => [...prev, newList]);
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

  const handleAddMovieToList = async (listId: string, listName: string) => {
    if (!userId) return;
    try {
      const response = await fetch(`/api/lists/${listId}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId, userId }),
      });

      if (response.ok) {
        notify(`Movie added to "${listName}" successfully!`, {
          type: "success",
        });
        onClose();
      } else {
        notify("Failed to add movie to list.", { type: "error" });
      }
    } catch {
      notify("Network error adding movie to list.", { type: "error" });
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
