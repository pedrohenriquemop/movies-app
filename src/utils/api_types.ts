export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  bio: string;
}

export interface UserWithoutPassword {
  id: number;
  username: string;
  email: string;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMovieDTO {
  title: string;
  description?: string;
  releaseYear: number;
  posterUrl?: string;
}

export interface MovieEntity {
  title: string;
  description: string | null;
  releaseYear: number;
  posterUrl: string | null;
}

export interface Movie {
  id: number;
  title: string;
  description: string | null;
  releaseYear: number;
  posterUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedMoviesResponse {
  movies: Movie[];
  totalCount: number;
  currentPage?: number;
  limit?: number;
}

export interface CreateRatingDTO {
  userId: number;
  movieId: number;
  rating: number;
  review: string;
}

export interface Rating {
  id: number;
  userId: number;
  movieId: number;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}
