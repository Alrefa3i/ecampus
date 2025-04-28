"use client";
import React, { useState, useEffect } from "react";
import CourseCard from "@/components/Card";
import CourseFilters from "@/components/Card/filterSection";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const CoursesClient = ({
  courses,
  categories,
}: {
  courses: any[];
  categories: any[];
}) => {
  const t = useTranslations("CoursesPage");
  const [Courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setCourses(courses);
    } else {
      const filtered = courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCourses(filtered);
    }
    setLoading(false);
  }, [courses, searchQuery]);

  const reSetCourses = () => {
    setLoading(true);
    setCourses(courses);
    setLoading(false);
  };

  const handleFilterChange = (filteredCourses: any[]) => {
    setLoading(true);
    // Apply search filter to the filtered courses if there's a search query
    if (searchQuery.trim() === "") {
      setCourses(filteredCourses);
    } else {
      const searchFiltered = filteredCourses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCourses(searchFiltered);
    }
    setLoading(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={`${t("searchPlaceholder")}`}
            className="pl-8"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="hidden lg:block">
          <CourseFilters
            courses={Courses}
            setCourses={setCourses}
            categories={categories}
            reSetCourses={reSetCourses}
            handleFilterChange={handleFilterChange}
          />
        </div>
        <div className="lg:hidden">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-4 py-3 text-base">
                {t("filters")}
              </AccordionTrigger>
              <AccordionContent>
                <CourseFilters
                  courses={Courses}
                  setCourses={setCourses}
                  categories={categories}
                  reSetCourses={reSetCourses}
                  handleFilterChange={handleFilterChange}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="flex items-center justify-center h-full w-full">
                <p className="text-lg font-semibold">Loading...</p>
              </div>
            ) : (
              Courses.map((course: any) => (
                <CourseCard
                  key={course.courseId}
                  id={course.courseId.toString()}
                  title={course.title}
                  image={
                    course.thumbnailImageUrl ||
                    "/placeholder.svg?height=200&width=300"
                  }
                  instructor={course.instructor}
                  price={course.currentPrice}
                  rating={0}
                  students={course.totalEnrollments}
                  category={course.categoryId?.toString() || ""}
                  isUserEnrolled={course.isUserEnrolled}
                  hours={course.courseDuration}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesClient;
