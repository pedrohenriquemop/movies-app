import {
  MOCK_CREATE_RATING_SUCCESS_RESPONSE,
  MOCK_MOVIE_1,
  MOCK_MOVIE_RATINGS_AFTER_SUBMISSION,
  MOCK_RATING_2,
  MOCK_VALID_USER,
} from "../fixtures/mockData";

describe("Submit Rating E2E Tests", () => {
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

    cy.mockGetMovies();

    cy.mockGetRatingsByMovieId(MOCK_MOVIE_1.id, [MOCK_RATING_2]);
    cy.visit(`/movies/${MOCK_MOVIE_1.id}`);
    cy.wait(`@getRatingsForMovie${MOCK_MOVIE_1.id}`);
  });

  it("allows a logged-in user to submit a new rating and review", () => {
    cy.mockCreateRatingSuccess();

    cy.mockGetRatingsByMovieId(
      MOCK_MOVIE_1.id,
      MOCK_MOVIE_RATINGS_AFTER_SUBMISSION,
    );

    const NEW_RATING = MOCK_CREATE_RATING_SUCCESS_RESPONSE.rating;
    const NEW_REVIEW = MOCK_CREATE_RATING_SUCCESS_RESPONSE.review;

    cy.get("input#rating").type(NEW_RATING.toString());
    cy.get("textarea#review").type(NEW_REVIEW);
    cy.get('button[type="submit"]').contains("Submit Rating").click();

    cy.wait("@createRatingRequest").its("request.body").should("deep.include", {
      movieId: MOCK_MOVIE_1.id,
      rating: NEW_RATING,
      review: NEW_REVIEW,
      userId: 1,
    });

    cy.wait(`@getRatingsForMovie${MOCK_MOVIE_1.id}`);

    cy.contains("Rating Submitted!").should("be.visible");

    cy.contains(NEW_REVIEW).should("be.visible");
    cy.contains(`Your review`).should("be.visible");
    cy.contains(`${NEW_RATING} / 10`).should("be.visible");
  });
});
