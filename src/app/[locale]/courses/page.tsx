import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Search } from "lucide-react";
import CourseCard from "@/components/Card";
import CourseFilters from "@/components/Card/filterSection";
import { Input } from "@/components/ui/input";
import {
  getCategories,
  getCourses,
  getCoursesUnauthorized,
  getServerAuthStatus,
  getUserById,
} from "@/lib/api";
import CoursesClient from "./CoursesClient";

export default async function Courses() {
  const { user } = await getServerAuthStatus();

  let courses: any[] = [];
  if (!user) {
    courses = await getCoursesUnauthorized();
  }
  if (user) {
    courses = await getCourses();
  }

  // getUserById(course.instructorId) || ""

  const fetchInstructor = async (instructorId: string) => {
    const instructor = await getUserById(instructorId);
    return instructor;
  };
  const fetchAllInstructors = async () => {
    const instructors = await Promise.all(
      courses.map((course) => fetchInstructor(course.instructorId))
    );
    return instructors;
  };
  const instructors = await fetchAllInstructors();
  const instructorMap = instructors.reduce((acc: any, instructor: any) => {
    acc[instructor.id] = instructor;
    return acc;
  }, {});

  const coursesWithInstructors = courses.map((course) => {
    const instructor = instructorMap[course.instructor] || null;

    return {
      ...course,
      instructor: instructor ? `${instructor.fullName}` : "Unknown Instructor",
    };
  });

  courses = coursesWithInstructors;

  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <CoursesClient courses={courses} categories={categories} />
    </div>
  );
}
