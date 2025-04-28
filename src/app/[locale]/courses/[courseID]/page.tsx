"use server";
import { getCategoryInfos, getCourseInformation } from "@/lib/api";
import Hero from "@/components/Course/Hero";
import CourseCard from "@/components/Course/CourseCard";
import { Course } from "@/lib/types";
import Prerequisites from "@/components/Course/Prerequisites";
import LearningObjectives from "@/components/Course/learningObjectives";
export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseID: string }>;
}) {
  const { courseID } = await params;

  const course: Course = await getCourseInformation(courseID);

  const {
    courseId,
    title,
    categoryId,
    majorId,
    thumbnailImageUrl,
    description,
    learningObjectives,
    prerequisites,
    languageOfInstruction,
    totalEnrollments,
    originalPrice,
    courseDuration,
    currentPrice,
    createdDate,
    lastUpdatedDate,
  } = course;

  const [category] = await Promise.all([getCategoryInfos(categoryId)]);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <main className="min-h-screen px-4 py-8 md:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Hero
          title={title}
          description={description}
          category={category.categoryName}
          languageOfInstruction={languageOfInstruction}
          thumbnailImageUrl={thumbnailImageUrl}
          createdDate={createdDate}
          lastUpdatedDate={lastUpdatedDate}
        />
        <CourseCard
          totalEnrollments={totalEnrollments}
          originalPrice={originalPrice}
          courseDuration={courseDuration}
          currentPrice={currentPrice}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {prerequisites && prerequisites.length > 0 && (
            <Prerequisites
              prerequisites={prerequisites
                .split(",")
                .map((prerequisite, index) => prerequisite.trim())}
            />
          )}
          {learningObjectives && learningObjectives.length > 0 && (
            <LearningObjectives
              objectives={learningObjectives
                .split(",")
                .map((objective, index) => objective.trim())}
            />
          )}
        </div>
      </div>
    </main>
  );
}
