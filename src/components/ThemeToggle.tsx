"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return !mounted ? null : (
    <Button
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
