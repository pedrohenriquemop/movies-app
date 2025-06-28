"use client";

import { useAuth } from "@/components/contexts/auth-context";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNotification } from "@/hooks/use-notification";
import { getUppercaseInitials } from "@/lib/utils";
import { authApi, tokenManager } from "@/utils/api";

const ProfilePage = () => {
  const { isLoggedIn, user, updateUser } = useAuth();
  const router = useRouter();
  const { notify } = useNotification();

  const [editingMode, setEditingMode] = useState(false);
  const [newBio, setNewBio] = useState(user?.bio || "");
  const [newAvatarUrl, setNewAvatarUrl] = useState(user?.avatarUrl || "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (user) {
      setNewBio(user.bio || "");
      setNewAvatarUrl(user.avatarUrl || "");
    }
  }, [user]);

  const handleEditToggle = () => {
    setEditingMode(!editingMode);

    if (editingMode && user) {
      setNewBio(user.bio || "");
      setNewAvatarUrl(user.avatarUrl || "");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || typeof user.id !== "number") {
      notify("Authentication Error", {
        description: "User not identified. Please log in again.",
        type: "error",
      });
      return;
    }

    setIsSaving(true);
    try {
      const token = tokenManager.getToken();
      if (!token) {
        notify("Error", {
          description: "Authentication token missing. Please log in again.",
          type: "error",
        });
        setIsSaving(false);
        return;
      }

      const updateData = {
        bio: newBio,
        avatarUrl: newAvatarUrl,
      };

      await authApi.updateUser(user.id, updateData, token);

      notify("Profile Updated", {
        description: "Your profile has been successfully updated!",
        type: "success",
      });

      updateUser({
        bio: newBio,
        avatarUrl: newAvatarUrl,
      });

      setEditingMode(false);
    } catch (error: unknown) {
      console.error("Error updating profile:", error);
      notify("Update Failed", {
        description:
          (error as Error).message ||
          "Failed to update profile. Please try again.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoggedIn) {
    return <h1 className="text-3xl text-red-500">Redirecting to login...</h1>;
  }

  if (!user) {
    return <p>Loading user profile...</p>;
  }

  return (
    <div className="max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">
        Your Profile
      </h1>

      <div className="flex flex-col items-center gap-6 rounded-lg border bg-white p-6 shadow-md dark:bg-gray-800">
        <Avatar className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-blue-500 dark:border-blue-400">
          <AvatarImage src={user.avatarUrl || ""} alt={user.username} />
          <AvatarFallback className="rounded-lg text-5xl">
            {getUppercaseInitials(user.username)}
          </AvatarFallback>
        </Avatar>

        {!editingMode ? (
          <div className="w-full text-center">
            <p className="mb-2 text-3xl font-semibold text-gray-900 dark:text-white">
              {user.username}
            </p>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {user.email}
            </p>

            <div className="mb-4 text-left">
              <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                Bio:
              </p>
              <p className="min-h-[50px] whitespace-pre-wrap text-gray-800 dark:text-gray-100">
                {user.bio || "No bio yet."}
              </p>
            </div>

            <Button onClick={handleEditToggle} className="w-full">
              Edit Profile
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSave} className="w-full space-y-4">
            <div className="grid gap-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={user.username}
                disabled
                className="cursor-not-allowed bg-gray-100 dark:bg-gray-700"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                disabled
                className="cursor-not-allowed bg-gray-100 dark:bg-gray-700"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="newBio">Bio</Label>
              <Textarea
                id="newBio"
                placeholder="Tell us about yourself..."
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                className="min-h-[100px] resize-y"
                disabled={isSaving}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="newAvatarUrl">Avatar URL</Label>
              <Input
                id="newAvatarUrl"
                type="url"
                placeholder="https://example.com/your-avatar.jpg"
                value={newAvatarUrl}
                onChange={(e) => {
                  setNewAvatarUrl(e.target.value);
                }}
                disabled={isSaving}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleEditToggle}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
