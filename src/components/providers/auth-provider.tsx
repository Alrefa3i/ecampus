"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser, logoutUser } from "@/lib/api";
import { toast } from "sonner";

interface AuthContextProps {
  user: any;
  login: (
    email: string,
    password: string,
    successMessage: string,
    successDescription: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setUser(token);
    } else {
      setUser(null);
    }
  }, []);

  const login = async (
    email: string,
    password: string,
    successMessage: string,
    successDescription: string
  ) => {
    try {
      // This will set both cookie (server-side) and session storage (client-side)
      const token = await loginUser({ email, password });
      sessionStorage.setItem("authToken", token);
      setUser(token);
      toast.success(successMessage, {
        description: successDescription,
      });
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed", {
        description: "Please check your credentials and try again",
      });
    }
  };

  const logout = async () => {
    try {
      // Clear server-side cookie
      await logoutUser();
      // Clear client-side storage
      sessionStorage.removeItem("authToken");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const register = async (data: any) => {
    try {
      await registerUser(data);
      // After registration, log in the user automatically
      const token = await loginUser({
        email: data.email,
        password: data.password,
      });
      sessionStorage.setItem("authToken", token);
      setUser(token);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed", {
        description: "An error occurred during registration",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
