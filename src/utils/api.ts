import {
  CreateRatingDTO,
  CreateUserDTO,
  LoginUserDTO,
  PaginatedMoviesResponse,
  Rating,
  UpdateUserDTO,
  UserWithoutPassword,
} from "./api_types";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface RequestOptions extends RequestInit {
  token?: string;
  body?: any;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { token, headers, body, ...rest } = options;

  const config: RequestInit = {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (token) {
    (config.headers as Record<string, string>)["Authorization"] =
      `Bearer ${token}`;
  }

  if (body && typeof body === "object") {
    config.body = JSON.stringify(body);
  } else if (body) {
    config.body = body as BodyInit;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || "An unknown error occurred");
  }

  return response.json() as Promise<T>;
}

export const authApi = {
  login: async (credentials: LoginUserDTO) => {
    return apiRequest<{ token: string }>("/users/login", {
      method: "POST",
      body: credentials,
    });
  },
  register: async (userData: CreateUserDTO) => {
    return apiRequest<UserWithoutPassword>("/users", {
      method: "POST",
      body: userData,
    });
  },
  getUserById: async (userId: number, token: string) => {
    return apiRequest<UserWithoutPassword>(`/users/${userId}`, {
      method: "GET",
      token,
    });
  },
  updateUser: async (
    userId: number,
    updateData: UpdateUserDTO,
    token: string,
  ) => {
    return apiRequest<{ message: string }>(`/users/${userId}`, {
      method: "PUT",
      body: updateData,
      token,
    });
  },
  deleteUser: async (userId: number, token: string) => {
    return apiRequest<{ message: string }>(`/users/${userId}`, {
      method: "DELETE",
      token,
    });
  },
};

export const moviesApi = {
  getMovies: async (title?: string, page: number = 1, limit: number = 10) => {
    const params = new URLSearchParams();
    if (title) params.append("title", title);
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    return apiRequest<PaginatedMoviesResponse>(`/movies?${params.toString()}`, {
      method: "GET",
    });
  },
};

export const ratingsApi = {
  createRating: async (ratingData: CreateRatingDTO, token: string) => {
    return apiRequest<Rating>("/ratings", {
      method: "POST",
      body: ratingData,
      token,
    });
  },
  getRatingsByMovieId: async (movieId: number) => {
    return apiRequest<Rating[]>(`/ratings/movie/${movieId}`, {
      method: "GET",
    });
  },
};

export const tokenManager = {
  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("jwt_token");
    }
    return null;
  },
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt_token", token);
    }
  },
  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt_token");
    }
  },
};
