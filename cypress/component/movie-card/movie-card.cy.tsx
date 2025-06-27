import MovieCard from "@/components/MovieCard/movie-card";
import { mockMovie } from "./mocks";

describe("MovieCard", () => {
  beforeEach(() => {
    cy.mount(<MovieCard movie={mockMovie} />);
  });

  it("renders the movie title and links to the movie detail page", () => {
    cy.get("a").contains(mockMovie.title).should("exist");
    cy.get("a")
      .contains(mockMovie.title)
      .should("have.attr", "href", `/movies/${mockMovie.id}`);
  });

  it("renders the movie overview", () => {
    cy.get('[data-slot="card-description"]')
      .contains(mockMovie.description as string)
      .should("exist");
  });

  it("renders the movie release year", () => {
    cy.get("[data-testid='movie-card-release-year']")
      .contains(mockMovie.releaseYear)
      .should("exist");
  });

  it("applies line-clamp-3 to the overview", () => {
    cy.get('[data-slot="card-description"]').should(
      "have.class",
      "line-clamp-3",
    );
  });
});
