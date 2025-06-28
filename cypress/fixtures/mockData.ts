import {
  Movie,
  PaginatedMoviesResponse,
  Rating,
  UserWithoutPassword,
} from "@/utils/api_types";

export const BACKEND_URL = "http://localhost:8080";

export const MOCK_VALID_USER: UserWithoutPassword = {
  id: 1,
  username: "testuser",
  email: "test@example.com",
  bio: "A passionate movie watcher.",
  avatarUrl: "https://placehold.co/128x128/FF5733/FFFFFF?text=TU",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const MOCK_AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzUwNjA0NjQwLCJleHAiOjE3NTA2OTEwNDB9.Ho58MoMC-RijA2r7_gdmKeI_8nLh7Yn2r9lg9GLMZpU";

export const MOCK_LOGIN_SUCCESS_RESPONSE = {
  token: MOCK_AUTH_TOKEN,
};

export const MOCK_LOGIN_INVALID_CREDENTIALS_RESPONSE = {
  message: "Password is incorrect",
};

export const MOCK_REGISTER_SUCCESS_RESPONSE: UserWithoutPassword = {
  ...MOCK_VALID_USER,
  email: "newuser@example.com",
  username: "newuser",
  id: 2,
};

export const MOCK_MOVIE_1: Movie = {
  id: 101,
  title: "Mock Movie One",
  description: "The first amazing mock movie.",
  releaseYear: 2020,
  posterUrl: "/poster1.jpg",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const MOCK_MOVIE_2: Movie = {
  id: 102,
  title: "Mock Movie Two",
  description: "The thrilling sequel.",
  releaseYear: 2021,
  posterUrl: "/poster2.jpg",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const MOCK_MOVIE_3: Movie = {
  id: 103,
  title: "Mock Movie Three",
  description: "A captivating drama.",
  releaseYear: 2022,
  posterUrl: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const MOCK_MOVIES_PAGE_1: PaginatedMoviesResponse = {
  movies: [MOCK_MOVIE_1, MOCK_MOVIE_2],
  totalCount: 3,
  currentPage: 1,
  limit: 2,
};

export const MOCK_MOVIES_PAGE_2: PaginatedMoviesResponse = {
  movies: [MOCK_MOVIE_3],
  totalCount: 3,
  currentPage: 2,
  limit: 2,
};

export const MOCK_RATING_1: Rating = {
  id: 201,
  userId: 1,
  movieId: MOCK_MOVIE_1.id,
  rating: 9,
  review: "Absolutely loved this movie!",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const MOCK_RATING_2: Rating = {
  id: 202,
  userId: 3,
  movieId: MOCK_MOVIE_1.id,
  rating: 7,
  review: "Pretty good, but not perfect.",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const MOCK_MOVIE_RATINGS_FOR_MOVIE_1: Rating[] = [
  MOCK_RATING_1,
  MOCK_RATING_2,
];

export const MOCK_CREATE_RATING_SUCCESS_RESPONSE: Rating = {
  id: 203,
  userId: MOCK_VALID_USER.id,
  movieId: MOCK_MOVIE_1.id,
  rating: 10,
  review: "My new favorite!",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const MOCK_MOVIE_RATINGS_AFTER_SUBMISSION: Rating[] = [
  MOCK_RATING_2,
  MOCK_CREATE_RATING_SUCCESS_RESPONSE,
];
