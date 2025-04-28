import React from "react";
import { requireAuth } from "@/lib/auth-utils";
import { getTopicLessons } from "@/lib/api";
import CourseContent from "./CourseContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { toast } from "sonner";

type Props = {
  params: Promise<{ courseID: string }>;
};
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export default async function CoursePage({ params }: Props) {
  const { courseID } = await params;
  const { user, token } = await requireAuth();
  const t = await getTranslations("CourseViewer");

  if (!courseID) {
    return (
      <div className="min-h-[70vh] w-full flex justify-center items-center text-center ">
        Course not found
      </div>
    );
  }

  if (!user || !token) {
    return (
      <div className="min-h-[70vh] w-full flex justify-center items-center text-center ">
        User not found
      </div>
    );
  }

  let topics = await getTopicLessons(courseID, token);
  if (topics.status == 400) {
    return (
      <div className="min-h-[70vh] w-full flex justify-center items-center text-center ">
        {t("errorMessages.NotEnrolled")}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t("courseContent")}</CardTitle>
        </CardHeader>
        <CardContent>
          <CourseContent topics={topics} isUserEnrolled={true} />
        </CardContent>
      </Card>
    </div>
  );
}
