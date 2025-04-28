"use server";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import type { RegisterFormData, LoginFormData, JwtPayload } from "@/lib/types";
import { loginFormSchema } from "@/lib/types";
import { cookies } from "next/headers";
const API_ACCOUNT_URL = `${process.env.API_URL}/Account`;
const API_COURSE_URL = `${process.env.API_URL}/Course`;
const API_CATEGORY_URL = `${process.env.API_URL}/Category`;
const API_PAYMENT_URL = `${process.env.API_URL}/Payment`;

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

  // Store token in cookies for server-side access
  (
    await // Store token in cookies for server-side access
    cookies()
  ).set("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return token;
}

// Assign role to a user
export async function assignRole(data: { email: string; roleName: string }) {
  const response = await axios.post(`${API_ACCOUNT_URL}/assign-role`, data);
  return response.data;
}

// Get user by ID
export async function getUserById(id: string) {
  if (!id) throw new Error("Invalid token: missing user id");
  const response = await axios.get(`${API_ACCOUNT_URL}/${id}`);
  return response.data;
}

/**
 * Check if the current request is from an authenticated user
 * @returns An object containing authentication status and user data
 */
export async function getServerAuthStatus() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  if (!token || !token.value) {
    return { isAuthenticated: false, user: null };
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token.value);

    // Verify the token hasn't expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return { isAuthenticated: false, user: null };
    }

    return {
      isAuthenticated: true,
      user: decoded,
      userId: decoded.nameid,
      token: token.value,
    };
  } catch (error) {
    // If token is invalid, return not authenticated
    return { isAuthenticated: false, user: null };
  }
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

export async function getMajor(collegeId: string) {
  const response = await axios.get(`${process.env.API_URL}/Major/${collegeId}`);
  return response.data;
}

export async function getCoursesUnauthorized() {
  const response = await axios.get(`${API_COURSE_URL}/unauthorized/courses`);
  return response.data;
}

export async function getCourses() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");
  if (!token || !token.value) {
    return { isAuthenticated: false, user: null };
  }
  const response = await axios.get(`${API_COURSE_URL}/courses`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });
  return response.data;
}

export async function getCategories() {
  const response = await axios.get(`${API_CATEGORY_URL}/`);
  return response.data;
}

export async function getCategoryInfos(id: number) {
  const response = await axios.get(`${API_CATEGORY_URL}/${id}`);
  return response.data;
}

// getCourseinformation
export async function getCourseInformation(id: string) {
  const response = await axios.get(`${API_COURSE_URL}/${id}`);
  return response.data;
}

// Logout user - server side function to clear cookies
export async function logoutUser() {
  (await cookies()).delete("authToken");
  return { success: true };
}

// Pay for a course
export async function payForCourse(data: {
  studentId: number;
  courseId: number;
  prepaidCardCode?: string;
  couponCode?: string;
  referralCode?: number;
}) {
  try {
    const response = await axios.post(
      `${API_PAYMENT_URL}/pay-for-course`,
      data
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error(
      "Error paying for course:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
}

export async function getEnrolledCourses(userToken: string) {
  const response = await axios.get(`${API_COURSE_URL}/enrolled`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response.data;
}

export async function getTopicLessons(courseID: string, token: string) {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/Topic/by-course/with-lessons/${courseID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return { status: 400, message: "Course not found" };
  }
}

export async function getLessonContent(lessonID: number, token: string) {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/VideoLesson/getvideourl/${lessonID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return {
      status: 200,
      data: response.data,
    };
  } catch (error) {
    return { status: 400, message: "Lesson not found" };
  }
}
