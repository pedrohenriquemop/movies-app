"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/components/contexts/auth-context";
import { useNotification } from "@/hooks/use-notification";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { login, register } = useAuth();
  const { notify } = useNotification();
  const [authUsername, setAuthUsername] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [mode, setMode] = useState<"register" | "login">("login");

  const handleLogin = async () => {
    if (mode === "register") {
      setMode("login");
      return;
    }

    if (!authEmail || !authPassword) {
      notify("Please enter both email and password", { type: "error" });
      return;
    }

    const result = await login(authEmail, authPassword);
    if (result.success) {
      notify("Login successful!", { type: "success" });
      onClose();
      setAuthEmail("");
      setAuthPassword("");
    } else {
      notify(result.message || "Login failed", { type: "error" });
    }
  };

  const handleRegister = async () => {
    if (mode === "login") {
      setMode("register");
      return;
    }

    const result = await register(authUsername, authEmail, authPassword);
    if (result.success) {
      notify("Registration successful! You are now logged in.", {
        type: "success",
      });
      onClose();
      setAuthUsername("");
      setAuthEmail("");
      setAuthPassword("");
    } else {
      notify(result.message || "Registration failed", { type: "error" });
    }
  };

  useEffect(() => {
    if (mode === "login") {
      setAuthUsername("");
    }
  }, [mode]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>
            {mode === "login"
              ? "Please log in to continue"
              : "Create a new account"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {mode === "register" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="auth-username" className="text-right">
                Username
              </label>
              <Input
                id="auth-username"
                type="text"
                value={authUsername}
                onChange={(e) => setAuthUsername(e.target.value)}
                placeholder="Enter username"
                className="col-span-3"
              />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="auth-email" className="text-right">
              Email
            </label>
            <Input
              id="auth-email"
              type="email"
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              placeholder="Enter email"
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="auth-password" className="text-right">
              Password
            </label>
            <Input
              id="auth-password"
              type="password"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              placeholder="Enter password"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            data-testid="auth-cancel-button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleRegister}
            variant={mode !== "register" ? "secondary" : "default"}
            data-testid="auth-register-button"
          >
            Register
          </Button>
          <Button
            onClick={handleLogin}
            variant={mode !== "login" ? "secondary" : "default"}
            data-testid="auth-login-button"
          >
            Login
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
