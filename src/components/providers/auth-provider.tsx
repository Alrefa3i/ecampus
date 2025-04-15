"use client";

import React, { createContext, useContext, useState } from "react";
import { loginUser, registerUser, getUserById } from "@/lib/api";

interface AuthContextProps {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  const login = async (email: string, password: string) => {
    const token = await loginUser({ email, password });
    sessionStorage.setItem("authToken", token); // Save token in session storage
    const userData = await getUserById(token); // Replace with actual user ID retrieval logic
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem("authToken"); // Remove the token from session storage
    setUser(null);
  };

  const register = async (data: any) => {
    await registerUser(data);
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
