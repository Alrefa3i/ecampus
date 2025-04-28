"use client";
import React, { ReactNode } from "react";
import { useAuth } from "@/components/providers/auth-provider";
const CheckAuth = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        Please login to access this page
      </div>
    );
  }
  return <>{children}</>;
};

export default CheckAuth;
