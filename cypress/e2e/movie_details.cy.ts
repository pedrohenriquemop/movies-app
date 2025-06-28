import {
  MOCK_AUTH_TOKEN,
  MOCK_MOVIE_1,
  MOCK_RATING_1,
  MOCK_RATING_2,
  MOCK_VALID_USER,
} from "../fixtures/mockData";

describe("Movie Details Page E2E Tests (Logged In)", () => {
  beforeEach(() => {
    cy.clearAuth();
    cy.visit("/");

    cy.mockLoginSuccess();

    cy.get('[data-testid="login-register-button"]').click();

    cy.get('input[type="email"]').type(MOCK_VALID_USER.email);
    cy.get('input[type="password"]').type("testpassword123");

    cy.get("button[data-testid='auth-login-button']").click();

    cy.wait("@loginRequest").its("request.body").should("deep.include", {
      email: MOCK_VALID_USER.email,
      password: "testpassword123",
    });
    cy.wait("@getUserByIdRequest").its("response.statusCode").should("eq", 200);

    cy.mockGetMovies(1, MOCK_MOVIE_1.id);
    cy.mockGetRatingsByMovieId(MOCK_MOVIE_1.id);
    cy.visit(`/movies/${MOCK_MOVIE_1.id}`);
  });

  it("displays movie details and existing reviews for logged-in users", () => {
    cy.wait(`@getMoviesPage1_single_${MOCK_MOVIE_1.id}`)
      .its("response.statusCode")
      .should("eq", 200);
    cy.wait(`@getRatingsForMovie${MOCK_MOVIE_1.id}`)
      .its("response.statusCode")
      .should("eq", 200);

    cy.contains(MOCK_MOVIE_1.title).should("be.visible");
    cy.contains(MOCK_MOVIE_1.description as string).should("be.visible");

    cy.contains(MOCK_RATING_1.review).should("be.visible");
    cy.contains(`Your review`).should("be.visible");
    cy.contains(MOCK_RATING_2.review).should("be.visible");
    cy.contains(`User ID: ${MOCK_RATING_2.userId}`).should("be.visible");
  });
});
