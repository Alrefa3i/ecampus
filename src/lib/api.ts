"use server";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import type { RegisterFormData, LoginFormData, JwtPayload } from "@/lib/types";
import { loginFormSchema } from "@/lib/types";
const API_ACCOUNT_URL = `${process.env.API_URL}/Account`;

// Register a new user
export async function registerUser(data: RegisterFormData) {
  const response = await axios.post(`${API_ACCOUNT_URL}/register`, data);
  return response.data;
}

// Login user
export async function loginUser(data: LoginFormData) {
  const result = loginFormSchema.safeParse(data);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    result.error.errors.forEach((err) => {
      if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
    });
    throw new Error(JSON.stringify(fieldErrors));
  }
  const response = await axios.post(`${API_ACCOUNT_URL}/login`, data);
  const token = response.data.token as string;
  return token;
}

// Assign role to a user
export async function assignRole(data: { email: string; roleName: string }) {
  const response = await axios.post(`${API_ACCOUNT_URL}/assign-role`, data);
  return response.data;
}

// Get user by ID
export async function getUserById(token: string) {
  console.log("Token:", token);
  const payload = jwtDecode<JwtPayload>(token);
  const id = payload.nameid;
  if (!id) throw new Error("Invalid token: missing user id");
  const response = await axios.get(`${API_ACCOUNT_URL}/${id}`);
  return response.data;
}

export async function getUniversities() {
  const response = await axios.get(`${process.env.API_URL}/University/all`);
  return response.data;
}

/// /College/{universityId}
export async function getColleges(universityId: string) {
  const response = await axios.get(
    `${process.env.API_URL}/College/${universityId}`
  );
  return response.data;
}

export async function getMajors(collegeId: string) {
  const response = await axios.get(`${process.env.API_URL}/Major/${collegeId}`);
  return response.data;
}
