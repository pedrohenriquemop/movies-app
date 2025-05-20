import {
  capitalizeFirstLetter,
  getUppercaseInitials,
  pathnameToSegments,
} from "@/lib/utils";

import "jest";

describe("capitalizeFirstLetter", () => {
  it("capitalizes the first letter of a lowercase word", () => {
    expect(capitalizeFirstLetter("movie")).toBe("Movie");
  });

  it("returns the same string if first letter is already uppercase", () => {
    expect(capitalizeFirstLetter("Movie")).toBe("Movie");
  });

  it("returns an empty string if input is empty", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });
});

describe("getUppercaseInitials", () => {
  it("returns single uppercase initial if only one word", () => {
    expect(getUppercaseInitials("matrix")).toBe("M");
  });

  it("returns initials of the first two words", () => {
    expect(getUppercaseInitials("john wick")).toBe("JW");
  });

  it("ignores extra words after the second", () => {
    expect(getUppercaseInitials("peter benjamin parker")).toBe("PB");
  });

  it("handles names with mixed case", () => {
    expect(getUppercaseInitials("John Wick")).toBe("JW");
  });
});

describe("pathnameToSegments", () => {
  it("returns only Home for root path", () => {
    expect(pathnameToSegments("/")).toEqual([{ name: "Home", href: "/" }]);
  });

  it("converts pathname into segments with capitalized names", () => {
    expect(pathnameToSegments("/movies/1")).toEqual([
      { name: "Home", href: "/" },
      { name: "Movies", href: "/movies" },
      { name: "1", href: "/movies/1" },
    ]);
  });

  it("uses custom breadcrumb mapping if provided", () => {
    const custom = { movies: "My Movies", "1": "The Matrix" };
    expect(pathnameToSegments("/movies/1", custom)).toEqual([
      { name: "Home", href: "/" },
      { name: "My Movies", href: "/movies" },
      { name: "The Matrix", href: "/movies/1" },
    ]);
  });

  it("handles trailing slashes gracefully", () => {
    expect(pathnameToSegments("/movies/1/")).toEqual([
      { name: "Home", href: "/" },
      { name: "Movies", href: "/movies" },
      { name: "1", href: "/movies/1" },
    ]);
  });

  it("ignores empty segments", () => {
    expect(pathnameToSegments("///movies///1")).toEqual([
      { name: "Home", href: "/" },
      { name: "Movies", href: "/movies" },
      { name: "1", href: "/movies/1" },
    ]);
  });
});
