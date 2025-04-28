"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, BookOpen, Video, CheckCircle, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { getLessonContent } from "@/lib/api";
import { useAuth } from "@/components/providers/auth-provider";
import Link from "next/link";

interface Lesson {
  lessonId: number;
  courseId: number;
  title: string;
  lessonType: string;
  description: string;
  thumbnailImageUrl: string | null;
  contentFileUrl: string | null;
  videoDuration: string | null;
  orderInCourseSequence: number;
  createdDate: string;
  lastUpdatedDate: string;
}

interface Topic {
  topicId: number;
  courseId: number;
  title: string;
  description: string;
  orderInCourse: number;
  lessons: Lesson[];
}

interface CourseContentProps {
  topics: Topic[];
  isUserEnrolled?: boolean;
}

export default function CourseContent({
  topics,
  isUserEnrolled = false,
}: CourseContentProps) {
  const t = useTranslations("CourseViewer");
  const { user } = useAuth();
  const [activeLessonId, setActiveLessonId] = useState<number | null>(
    topics?.[0]?.lessons?.[0]?.lessonId || null
  );
  const [activeLessonContent, setActiveLessonContent] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const allLessons = topics.flatMap((topic) => topic.lessons);
  const activeLesson = allLessons.find(
    (lesson) => lesson.lessonId === activeLessonId
  );

  const handleLessonClick = (lessonId: number) => {
    if (isUserEnrolled) {
      setActiveLessonId(lessonId);
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "article":
        return <BookOpen className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  if (!topics || topics.length === 0) {
    return (
      <div className="py-8 text-center">
        <h3 className="text-lg font-medium">{t("noContentAvailable")}</h3>
        <p className="text-muted-foreground mt-2">
          {t("noContentDescription")}
        </p>
      </div>
    );
  }

  useEffect(() => {
    console.log("Active lesson ID:", activeLessonContent);
    if (activeLessonId && user) {
      const fetchLessonContent = async () => {
        console.log("Fetching lesson content for ID:", activeLessonId);
        try {
          const lessonContent = await getLessonContent(activeLessonId, user);

          if (lessonContent.status === 200) {
            console.log("Lesson content fetched:", lessonContent);
            setActiveLessonContent(lessonContent.data.url);
          } else {
            console.error("Failed to fetch lesson content:", lessonContent);
          }
        } catch (error) {
          console.error("Error fetching lesson content:", error);
        }
      };
      fetchLessonContent();
    }
    console.log("Active lesson ID changed:", activeLessonId);
  }, [activeLessonId, user]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left sidebar: Course Structure */}
      <div className="md:col-span-1">
        <div className="sticky top-20">
          <h3 className="text-xl font-semibold mb-4">{t("courseContent")}</h3>
          <div className="bg-card border rounded-lg">
            <Accordion type="single" collapsible className="w-full">
              {topics.map((topic) => (
                <AccordionItem
                  key={topic.topicId}
                  value={`topic-${topic.topicId}`}
                >
                  <AccordionTrigger className="px-4 py-3 text-base">
                    {topic.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1 px-1">
                      {topic.lessons.map((lesson) => (
                        <li key={lesson.lessonId}>
                          <Button
                            variant={
                              activeLessonId === lesson.lessonId
                                ? "secondary"
                                : "ghost"
                            }
                            className="w-full justify-start text-sm py-2 px-3"
                            onClick={() => handleLessonClick(lesson.lessonId)}
                            disabled={!isUserEnrolled}
                          >
                            <div className="flex items-center gap-2 w-full">
                              <span className="flex-shrink-0">
                                {isUserEnrolled ? (
                                  getLessonIcon(lesson.lessonType)
                                ) : (
                                  <Lock className="h-4 w-4" />
                                )}
                              </span>
                              <span className="flex-grow text-left truncate">
                                {lesson.title}
                              </span>
                              {!isUserEnrolled && (
                                <Badge variant="outline" className="ml-auto">
                                  {t("locked")}
                                </Badge>
                              )}
                            </div>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      {/* Right area: Lesson Content */}
      <div className="md:col-span-2">
        {activeLesson ? (
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="container bg-muted rounded-md flex items-center justify-center mb-4 h-96">
                  {isUserEnrolled ? (
                    <div className="text-center w-full h-full">
                      {activeLessonContent ? (
                        <div className="w-full h-full">
                          <iframe
                            src={activeLessonContent}
                            allowFullScreen
                            className="w-full h-full rounded-md"
                            style={{ border: "none" }}
                          ></iframe>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                          <PlayCircle className="h-16 w-16 text-muted-foreground mb-2" />
                          <p>{t("contentPlaceholder")}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">
                        {t("contentLocked")}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {t("contentLockedDescription")}
                      </p>
                      <Button>{t("enrollNow")}</Button>
                    </div>
                  )}
                </div>
                <h2 className="text-2xl font-semibold mb-2">
                  {activeLesson.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {activeLesson.description || t("noDescription")}
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
            <p className="text-muted-foreground">{t("selectLesson")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
