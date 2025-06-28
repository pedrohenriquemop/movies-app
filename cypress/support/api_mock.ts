import { Movie } from "@/utils/api_types";
import {
  BACKEND_URL,
  MOCK_VALID_USER,
  MOCK_AUTH_TOKEN,
  MOCK_LOGIN_SUCCESS_RESPONSE,
  MOCK_LOGIN_INVALID_CREDENTIALS_RESPONSE,
  MOCK_REGISTER_SUCCESS_RESPONSE,
  MOCK_MOVIE_1,
  MOCK_MOVIE_2,
  MOCK_MOVIE_3,
  MOCK_MOVIES_PAGE_1,
  MOCK_MOVIES_PAGE_2,
  MOCK_MOVIE_RATINGS_FOR_MOVIE_1,
  MOCK_CREATE_RATING_SUCCESS_RESPONSE,
  MOCK_MOVIE_RATINGS_AFTER_SUBMISSION,
} from "../fixtures/mockData";

declare global {
  namespace Cypress {
    interface Chainable {
      mockLoginSuccess(): Chainable<null>;
      mockLoginFailure(): Chainable<null>;
      mockRegisterSuccess(): Chainable<null>;

      mockGetMovies(page?: number, singleMovieId?: number): Chainable<null>;
      mockGetRatingsByMovieId(
        movieId: number,
        ratingsData?: any,
      ): Chainable<null>;
      mockCreateRatingSuccess(): Chainable<null>;
    }
  }
}

Cypress.Commands.add("mockLoginSuccess", () => {
  cy.intercept("POST", `${BACKEND_URL}/users/login`, {
    statusCode: 200,
    body: MOCK_LOGIN_SUCCESS_RESPONSE,
  }).as("loginRequest");

  cy.intercept("GET", `${BACKEND_URL}/users/${MOCK_VALID_USER.id}`, {
    statusCode: 200,
    body: MOCK_VALID_USER,
  }).as("getUserByIdRequest");
});

Cypress.Commands.add("mockLoginFailure", () => {
  cy.intercept("POST", `${BACKEND_URL}/users/login`, {
    statusCode: 401,
    body: MOCK_LOGIN_INVALID_CREDENTIALS_RESPONSE,
  }).as("loginRequest");
});

Cypress.Commands.add("mockRegisterSuccess", () => {
  cy.intercept("POST", `${BACKEND_URL}/users`, {
    statusCode: 201,
    body: MOCK_REGISTER_SUCCESS_RESPONSE,
  }).as("registerRequest");
});

Cypress.Commands.add("mockGetMovies", (page = 1, singleMovieId?: number) => {
  let responseBody;

  if (singleMovieId) {
    let movieToReturn: Movie | undefined;
    if (singleMovieId === MOCK_MOVIE_1.id) movieToReturn = MOCK_MOVIE_1;
    else if (singleMovieId === MOCK_MOVIE_2.id) movieToReturn = MOCK_MOVIE_2;
    else if (singleMovieId === MOCK_MOVIE_3.id) movieToReturn = MOCK_MOVIE_3;

    if (movieToReturn) {
      responseBody = {
        movies: [movieToReturn],
        totalCount: 1,
        currentPage: 1,
        limit: 1000,
      };
    } else {
      responseBody = {
        movies: [],
        totalCount: 0,
        currentPage: 1,
        limit: 1000,
      };
    }
  } else {
    responseBody = page === 1 ? MOCK_MOVIES_PAGE_1 : MOCK_MOVIES_PAGE_2;
  }

  cy.intercept("GET", `${BACKEND_URL}/movies*`, {
    statusCode: 200,
    body: responseBody,
  }).as(
    `getMoviesPage${page}${singleMovieId ? `_single_${singleMovieId}` : ""}`,
  );
});

Cypress.Commands.add(
  "mockGetRatingsByMovieId",
  (movieId: number, ratingsData?: any) => {
    cy.intercept("GET", `${BACKEND_URL}/ratings/movie/${movieId}`, {
      statusCode: 200,
      body: ratingsData || MOCK_MOVIE_RATINGS_FOR_MOVIE_1,
    }).as(`getRatingsForMovie${movieId}`);
  },
);

Cypress.Commands.add("mockCreateRatingSuccess", () => {
  cy.intercept("POST", `${BACKEND_URL}/ratings`, {
    statusCode: 201,
    body: MOCK_CREATE_RATING_SUCCESS_RESPONSE,
  }).as("createRatingRequest");
});
