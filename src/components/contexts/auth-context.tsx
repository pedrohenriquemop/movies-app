"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import jwt from "jsonwebtoken";
import { authApi, tokenManager } from "@/utils/api";

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: AuthUser | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const fetchAndSetUser = useCallback(async (token: string) => {
    try {
      const decodedToken = jwt.decode(token) as {
        id: number;
        iat: number;
        exp: number;
      };
      if (!decodedToken || typeof decodedToken.id !== "number") {
        throw new Error("Invalid token structure.");
      }
      const userId = decodedToken.id;

      const userData = await authApi.getUserById(userId, token);
      setUser(userData);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error("Error fetching user data or decoding token:", error);
      tokenManager.removeToken();
      setIsLoggedIn(false);
      setUser(null);
      return false;
    }
  }, []);

  useEffect(() => {
    const token = tokenManager.getToken();
    if (token) {
      fetchAndSetUser(token);
    }
  }, [fetchAndSetUser]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await authApi.login({ email, password });

        if (response && response.token) {
          tokenManager.setToken(response.token);
          const success = await fetchAndSetUser(response.token);
          if (success) {
            return { success: true };
          } else {
            return {
              success: false,
              message: "Failed to load user data after login.",
            };
          }
        } else {
          setIsLoggedIn(false);
          setUser(null);
          return {
            success: false,
            message: "Login failed",
          };
        }
      } catch (error: any) {
        console.error("Error during login:", error);
        setIsLoggedIn(false);
        setUser(null);
        return {
          success: false,
          message: error.message || "Network error during login",
        };
      }
    },
    [fetchAndSetUser],
  );

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      try {
        const newUser = await authApi.register({ username, email, password }); // Use backend API

        if (newUser && newUser.id) {
          return await login(email, password);
        } else {
          console.error("Registration failed: No user object returned.");
          return {
            success: false,
            message: "Registration failed: Invalid response",
          };
        }
      } catch (error: any) {
        console.error("Error during registration:", error);

        return {
          success: false,
          message: error.message || "Network error during registration",
        };
      }
    },
    [login],
  );

  const logout = useCallback(() => {
    tokenManager.removeToken();
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  const contextValue = React.useMemo(
    () => ({
      isLoggedIn,
      user,
      login,
      register,
      logout,
    }),
    [isLoggedIn, user, login, register, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
