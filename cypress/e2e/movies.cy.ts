import { MOCK_MOVIE_1, MOCK_MOVIE_2, MOCK_MOVIE_3 } from "../fixtures/mockData";

describe("Movies Page E2E Tests", () => {
  beforeEach(() => {
    cy.visit("/movies");
  });

  it("displays a list of movies with pagination", () => {
    cy.mockGetMovies(1);

    cy.contains(MOCK_MOVIE_1.title).should("be.visible");
    cy.contains(MOCK_MOVIE_2.title).should("be.visible");
    cy.contains(MOCK_MOVIE_3.title).should("not.exist");

    cy.contains("Page 1 of 2 (3 total movies)").should("be.visible");
    cy.get("button").contains("Previous").should("be.disabled");
    cy.get("button").contains("Next").should("not.be.disabled");

    cy.mockGetMovies(2);
    cy.get("button").contains("Next").click();

    cy.wait("@getMoviesPage2").its("response.statusCode").should("eq", 200);
    cy.contains(MOCK_MOVIE_1.title).should("not.exist");
    cy.contains(MOCK_MOVIE_3.title).should("be.visible");
    cy.contains("Page 2 of 2 (3 total movies)").should("be.visible");
    cy.get("button").contains("Next").should("be.disabled");
    cy.get("button").contains("Previous").should("not.be.disabled");
  });

  it("allows navigating to movie detail page", () => {
    cy.mockGetMovies(1);
    cy.mockGetMovies(1, MOCK_MOVIE_1.id);

    cy.contains(MOCK_MOVIE_1.title).click();

    cy.wait(`@getMoviesPage1_single_${MOCK_MOVIE_1.id}`)
      .its("response.statusCode")
      .should("eq", 200);
    cy.url().should("include", `/movies/${MOCK_MOVIE_1.id}`);
    cy.contains(MOCK_MOVIE_1.description as string).should("be.visible");
  });
});
