"use client";

import { usePathname } from "next/navigation";
import AppBreadcrumb from "./AppBreadcrumb/app-breadcrumb";
import ThemeToggle from "./theme-toggle";
import { SidebarTrigger } from "./ui/sidebar";
import { pathnameToSegments } from "@/lib/utils";
import { useBreadcrumb } from "@/hooks/use-breadcrumb";

const Header = () => {
  const pathname = usePathname();

  const { breadcrumb } = useBreadcrumb();

  const breadcrumbPathSegments = pathnameToSegments(pathname, breadcrumb);

  return (
    <header className="flex w-full items-center justify-between">
      <SidebarTrigger className="-ml-1.5" />
      <div className="flex flex-1 items-center justify-start">
        <AppBreadcrumb pathSegments={breadcrumbPathSegments} />
      </div>
      <ThemeToggle />
    </header>
  );
};

export default Header;
