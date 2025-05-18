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

export function getUppercaseInitials(name: string) {
  const names = name.split(" ");
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  return names[0].charAt(0).toUpperCase() + names[1].charAt(0).toUpperCase();
}
