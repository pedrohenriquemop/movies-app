"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

export type AuthUser = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: AuthUser | null;
  login: (
    username: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  register: (
    username: string,
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

  // For this mock, we're assuming logged out user on initial load
  useEffect(() => {
    // Start logged out in this version
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsLoggedIn(true);
        setUser({
          id: data.userId,
          username: data.username,
          email: data.email,
        });
        return { success: true };
      } else {
        setIsLoggedIn(false);
        setUser(null);
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false, message: "Network error during login" };
    }
  }, []);

  const register = useCallback(async (username: string, password: string) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsLoggedIn(true);
        setUser({
          id: data.userId,
          username: data.username,
          email: data.email,
        });
        return { success: true };
      } else {
        console.error("Registration failed:", data.message);
        return {
          success: false,
          message: data.message || "Registration failed",
        };
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return { success: false, message: "Network error during registration" };
    }
  }, []);

  const logout = useCallback(() => {
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
