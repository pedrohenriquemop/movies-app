"use client";

import { useAuth } from "@/components/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ListsPage = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return <h1 className="text-3xl">My lists</h1>;
};

export default ListsPage;
