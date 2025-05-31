"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; //
import { Input } from "@/components/ui/input"; //
import { useAuth } from "@/components/contexts/auth-context"; //
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { login, register } = useAuth();
  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  const handleLogin = async () => {
    setAuthMessage("");
    const result = await login(authUsername, authPassword);
    if (result.success) {
      onClose();
      setAuthUsername("");
      setAuthPassword("");
    } else {
      setAuthMessage(result.message || "Login failed");
    }
  };

  const handleRegister = async () => {
    setAuthMessage("");
    const result = await register(authUsername, authPassword);
    if (result.success) {
      onClose();
      setAuthUsername("");
      setAuthPassword("");
    } else {
      setAuthMessage(result.message || "Registration failed");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {" "}
      <DialogContent className="sm:max-w-[425px]">
        {" "}
        <DialogHeader>
          {" "}
          <DialogTitle>Authentication</DialogTitle>
          <DialogDescription>
            {" "}
            Login or register to access all features.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {authMessage && <p className="text-sm text-red-500">{authMessage}</p>}
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
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleRegister}>Register</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
