"use server";

import axios from "axios";

const API_BASE_URL = "https://ecampus-edu.runasp.net/api/Account";

// Register a new user
export async function registerUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  majorId: number;
  phoneNumber: string;
  profilePictureUrl: string;
}) {
  const response = await axios.post(`${API_BASE_URL}/register`, data);
  return response.data;
}

// Login user
export async function loginUser(data: { email: string; password: string }) {
  const response = await axios.post(`${API_BASE_URL}/login`, data);
  return response.data;
}

// Assign role to a user
export async function assignRole(data: { email: string; roleName: string }) {
  const response = await axios.post(`${API_BASE_URL}/assign-role`, data);
  return response.data;
}

// Get user by ID
export async function getUserById(token: string) {
  const id = 1; // Replace with actual logic to get the logged-in user's ID
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
}
