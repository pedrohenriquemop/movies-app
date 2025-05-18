"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  return (
    <Button
      className="h-8 w-8 rounded-full p-0"
      variant="outline"
      size="icon"
      onClick={() =>
        resolvedTheme !== "dark" ? setTheme("dark") : setTheme("light")
      }
    >
      {resolvedTheme === "light" ? <MoonStar /> : <Sun />}
    </Button>
  );
};

export default ThemeToggle;
