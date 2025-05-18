"use client";

import { useBreadcrumb } from "@/hooks/use-breadcrumb";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const MovieError = () => {
  const { setBreadcrumb } = useBreadcrumb();
  const lastPath = usePathname()?.split("/")?.at(-1) || "";

  useEffect(() => {
    setBreadcrumb({
      [lastPath]: "Movie not found",
    });
  }, [lastPath, setBreadcrumb]);

  return <h1 className="text-3xl">Movie not found</h1>;
};

export default MovieError;
