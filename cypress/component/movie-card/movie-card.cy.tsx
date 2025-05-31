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
      .contains(mockMovie.overview)
      .should("exist");
  });

  it("renders the genres as badges", () => {
    const genres = JSON.parse(mockMovie.genres.replaceAll("'", '"'));
    genres.forEach((genre: { name: string }) => {
      cy.get('[data-slot="badge"]').contains(genre.name).should("exist");
    });
  });

  it("renders the vote average badge", () => {
    cy.get('[data-slot="badge"]')
      .contains(`${mockMovie.vote_average} / 10`)
      .should("exist");
  });

  it("renders the IMDb link with correct href and text", () => {
    cy.get("a").contains("View on IMDb").should("exist");
    cy.get("a")
      .contains("View on IMDb")
      .should(
        "have.attr",
        "href",
        `https://www.imdb.com/title/${mockMovie.imdb_id}`,
      );
    cy.get("a").contains("View on IMDb").find("svg").should("exist");
  });

  it("applies line-clamp-3 to the overview", () => {
    cy.get('[data-slot="card-description"]').should(
      "have.class",
      "line-clamp-3",
    );
  });
});
