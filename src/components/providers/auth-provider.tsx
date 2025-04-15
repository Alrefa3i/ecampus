"use client";

import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import { loginUser, registerUser, getUserById } from "@/lib/api";
import { toast } from "sonner";
interface AuthContextProps {
  user: any;
  login: (
    email: string,
    password: string,
    successMessage: string,
    successDescription: string
  ) => Promise<void>;
  logout: () => void;
  register: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("authToken"); // Get the token from session storage
    if (token) {
      //   const fetchUser = async () => {
      //     try {
      //       const userData = await getUserById(token);
      //       setUser(userData);
      //     } catch (error) {
      //       console.error("Failed to fetch user:", error);
      //       setUser(null); // Handle the case where fetching user fails
      //     }
      //   };
      //   fetchUser();
      // } else if (user) {
      //   // If user is already set, do nothing
      //   return;

      setUser(token);
    } else {
      setUser(null); // Handle the case where the token is not available
    }
  }, [user]);

  const login = async (
    email: string,
    password: string,
    successMessage: string,
    successDescription: string
  ) => {
    const token = await loginUser({ email, password });
    sessionStorage.setItem("authToken", token); // Save token in session storage
    // const userData = await getUserById(token); // Replace with actual user ID retrieval logic
    setUser(token);
    toast.success(successMessage, {
      description: successDescription,
    });
  };

  const logout = () => {
    sessionStorage.removeItem("authToken"); // Remove the token from session storage
    setUser(null);
  };

  const register = async (data: any) => {
    const userData = await registerUser(data);
    const token = await loginUser({
      email: data.email,
      password: data.password,
    });
    sessionStorage.setItem("authToken", token); // Save token in session storage
    setUser(userData);
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
