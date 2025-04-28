import { z } from "zod";

export type User = {
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  passwordHash: string;
  passwordSalt: string;
  profilePictureUrl: string;
  isApproved: boolean;
  isLockedOut: boolean;
  failedLoginAttempts: number;
  createdDate: string;
  lastLoginDate?: string | null;
};

// Register Form Data Type
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  majorId: number;
  phoneNumber: string;
  profilePictureUrl: string;
};

// Login Form Data Type
export type LoginFormData = {
  email: string;
  password: string;
};

// JwtPayload Type
export type JwtPayload = {
  nameid: string;
  unique_name: string;
  email: string;
  DateOfBirth: string;
  TokenId: string;
  role: string;
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
};

// Validation Schemas
export const registerFormSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  majorId: z.coerce.number().int("Major ID must be an integer"),
  phoneNumber: z.string().nonempty("Phone number is required"),
  profilePictureUrl: z.string().url("Invalid URL format"),
});

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type Course = {
  courseId: number;
  instructorId: number;
  title: string;
  categoryId: number;
  majorId: number;
  thumbnailImageUrl: string;
  description: string;
  learningObjectives?: string;
  prerequisites?: string;
  currentPrice: number;
  originalPrice: number;
  createdDate: string;
  lastUpdatedDate: string;
  courseDuration: number;
  languageOfInstruction: string;
  totalEnrollments: number;
  isApproved: boolean;
  trialContentUrl?: string;
};

export interface PaymentFormData {
  studentId: number;
  courseId: number;
  prepaidCardCode?: string;
  couponCode?: string;
  referralCode?: number;
}
