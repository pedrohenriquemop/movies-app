"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useNotification } from "@/hooks/use-notification";
import { MovieList } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { PopoverContent } from "@radix-ui/react-popover";
import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverTrigger } from "./ui/popover";

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

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<MovieList | null>(null);
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

  const handleSelectList = (listId: MovieList["id"]) => {
    const selectedList = userLists.find((list) => list.id === listId);

    if (!selectedList) {
      notify("Selected list not found.", { type: "error" });
      return;
    }

    setSelectedList(selectedList);
    setIsSelectOpen(false);
  };

  const handleAddMovieToList = async () => {
    const { userId, id: listId, name: listName } = selectedList || {};

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

          <div className="flex-1 border-t pt-4">
            <h3 className="text-md mb-2 font-semibold">Your Lists</h3>
            {isLoading ? (
              <p>Loading lists...</p>
            ) : userLists.length === 0 ? (
              <p className="text-sm text-gray-500">
                No lists found. Create one above!
              </p>
            ) : (
              <Popover open={isSelectOpen} onOpenChange={setIsSelectOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={isSelectOpen}
                    className="w-full justify-between"
                  >
                    {selectedList?.name || "Select list..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300] p-0">
                  <Command>
                    <CommandInput placeholder="Search for list..." />
                    <CommandList>
                      <CommandEmpty>No list found.</CommandEmpty>
                      <CommandGroup>
                        {userLists.map((list) => (
                          <CommandItem
                            key={list.id}
                            value={list.id}
                            onSelect={handleSelectList}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedList?.id === list.id
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {list.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleAddMovieToList}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToListDialog;
