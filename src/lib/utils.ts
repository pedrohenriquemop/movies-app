import { PathSegment } from "@/components/app-breadcrumb";
import { BreadcrumbContextData } from "@/components/contexts/breadcrumb-context";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pathnameToSegments(
  pathname: string,
  customBreadcrumb?: BreadcrumbContextData | null,
): PathSegment[] {
  const homeSegment = {
    name: "Home",
    href: "/",
  };

  console.log(
    "wrong",
    pathname,
    pathname
      .split("/")
      .filter((segment) => segment)
      .map((segment, index) => ({
        name: customBreadcrumb?.[segment] || capitalizeFirstLetter(segment),
        href: `/${pathname
          .split("/")
          .slice(0, index + 1)
          .join("/")}`,
      })),
  );

  return [
    homeSegment,
    ...pathname
      .split("/")
      .filter((segment) => segment)
      .map((segment, index, arr) => ({
        name: customBreadcrumb?.[segment] || capitalizeFirstLetter(segment),
        href: `/${arr.slice(0, index + 1).join("/")}`,
      })),
  ];
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
