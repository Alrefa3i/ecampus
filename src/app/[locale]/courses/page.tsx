import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Search } from "lucide-react";
import CourseCard from "@/components/Card";
import CourseFilters from "@/components/Card/filterSection";
import { Input } from "@/components/ui/input";
export default async function Courses() {
  const t = await getTranslations("CoursesPage");
  return (
    <div className="container mx-auto px-4 py-8">
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
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="hidden lg:block">
          <CourseFilters />
        </div>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              id="1"
              title="Introduction to Web Development"
              description="Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites."
              image="/placeholder.svg?height=200&width=300"
              instructor="Sarah Johnson"
              price={49.99}
              rating={4.8}
              students={1243}
              category="Web Development"
            />
            <CourseCard
              id="2"
              title="Advanced React Patterns"
              description="Master advanced React concepts including hooks, context, and performance optimization."
              image="/placeholder.svg?height=200&width=300"
              instructor="Michael Chen"
              price={79.99}
              rating={4.9}
              students={856}
              category="Frontend"
            />
            <CourseCard
              id="3"
              title="Data Science Fundamentals"
              description="Introduction to data analysis, visualization, and machine learning concepts."
              image="/placeholder.svg?height=200&width=300"
              instructor="Emily Rodriguez"
              price={59.99}
              rating={4.7}
              students={1876}
              category="Data Science"
            />
            <CourseCard
              id="4"
              title="UX/UI Design Principles"
              description="Learn the core principles of user experience and interface design."
              image="/placeholder.svg?height=200&width=300"
              instructor="David Kim"
              price={69.99}
              rating={4.6}
              students={932}
              category="Design"
            />
            <CourseCard
              id="5"
              title="Node.js Backend Development"
              description="Build scalable backend applications with Node.js, Express, and MongoDB."
              image="/placeholder.svg?height=200&width=300"
              instructor="Jessica Taylor"
              price={64.99}
              rating={4.7}
              students={1054}
              category="Backend"
            />
            <CourseCard
              id="6"
              title="Python for Beginners"
              description="Start your programming journey with Python, the most versatile programming language."
              image="/placeholder.svg?height=200&width=300"
              instructor="Robert Wilson"
              price={39.99}
              rating={4.8}
              students={2341}
              category="Programming"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
