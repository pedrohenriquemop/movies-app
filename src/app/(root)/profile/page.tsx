"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/components/contexts/auth-context";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return <h1 className="text-3xl text-red-500">Redirecting to login...</h1>;
  }

  return (
    <div>
      <h1 className="text-3xl">Profile Page</h1>
      {user && (
        <div className="mt-4 max-w-md rounded-lg border p-4">
          <p className="text-lg font-semibold">Welcome, {user.username}!</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            User ID: {user.id}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Mock Email: {user.username}@example.com
          </p>
          <p className="mt-2">This is your basic profile information.</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
