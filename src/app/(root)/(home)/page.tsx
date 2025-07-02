"use client";

import { useAuth } from "@/components/contexts/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Film, User } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="flex min-h-[calc(100vh-6rem)] flex-col items-start justify-start p-4">
      <h1 className="mb-8 text-5xl font-bold text-gray-900 dark:text-white">
        Welcome to SceneIt!
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card className="relative flex h-75 max-h-75 min-h-75 w-60 max-w-sm flex-col justify-between overflow-hidden p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <Film className="text-secondary absolute top-[-5rem] left-[-5rem] z-0 size-80 opacity-65" />
          <CardHeader className="z-1 pb-4">
            <CardTitle className="text-3xl font-semibold">Movies</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Explore a vast collection of films, search by title, and discover
              new cinematic experiences.
            </CardDescription>
          </CardHeader>
          <CardFooter className="z-1">
            <Link href="/movies" passHref>
              <Button asChild>
                <span>View Movies</span>
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card
          className={`relative flex h-75 max-h-75 min-h-75 w-60 max-w-sm flex-col justify-between overflow-hidden p-6 shadow-lg transition-all duration-300 ${
            !isLoggedIn
              ? "cursor-not-allowed opacity-50 grayscale"
              : "hover:scale-105 hover:shadow-xl"
          }`}
        >
          <User className="text-secondary absolute top-[-5rem] left-[-5rem] z-0 size-80 opacity-65" />
          <CardHeader className="z-1 pb-4">
            <CardTitle className="text-3xl font-semibold">Profile</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {isLoggedIn
                ? "Manage your personal information, update your bio, and change your avatar."
                : "Log in to access your personal profile, manage settings, and more."}
            </CardDescription>
          </CardHeader>
          <CardFooter className="z-1">
            {isLoggedIn ? (
              <Link href="/profile" passHref>
                <Button asChild>
                  <span>Go to Profile</span>
                </Button>
              </Link>
            ) : (
              <Button disabled className="cursor-not-allowed">
                Log in to View Profile
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
