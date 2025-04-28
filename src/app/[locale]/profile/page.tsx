import React from "react";
import { redirect } from "next/navigation";
import { getServerAuthStatus, getUserById, logoutUser } from "@/lib/api";
import { requireAuth, checkAuth } from "@/lib/auth-utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { getTranslations, getLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, BookOpen, Bookmark, Layers, MessageSquare } from "lucide-react";
import { getEnrolledCourses } from "@/lib/api";
import type { User as UserType } from "@/lib/types";
import CheckAuth from "./CheckAuth";
import Link from "next/link";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
export default async function ProfilePage() {
  const t = await getTranslations("AuthPages.Profile");
  const { user, token } = await getServerAuthStatus();
  const userId = user?.nameid;
  const { isAuthenticated } = await checkAuth();
  const locale = await getLocale();
  const { userId: authUserId } = await getServerAuthStatus();
  if (!isAuthenticated) {
    redirect("/login");
  }
  if (userId !== authUserId) {
    return (
      <div className="container mx-auto py-12 px-12">
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>{t("profileNotFound")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t("profileNotFoundDescription")}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => logoutUser()}>{t("logout")}</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  if (!userId) {
    return (
      <div className="container mx-auto py-12 px-12">
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>{t("profileNotFound")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t("profileNotFoundDescription")}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => logoutUser()}>{t("logout")}</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const userData: UserType = await getUserById(userId);

  if (!userData) {
    return (
      <div className="container mx-auto py-12 px-12">
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>{t("profileNotFound")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t("profileNotFoundDescription")}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => logoutUser()}>{t("logout")}</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (userData?.userId != userId) {
    return (
      <div className="container mx-auto py-12 px-12">
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>{t("profileNotFound")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t("profileNotFoundDescription")}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => logoutUser()}>{t("logout")}</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  console.log("userData", token);
  if (!token) {
    return (
      <div className="container mx-auto py-12 px-12">
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>{t("profileNotFound")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t("profileNotFoundDescription")}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => logoutUser()}>{t("logout")}</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
  const enrolledCourses = await getEnrolledCourses(token);
  return (
    <CheckAuth>
      {" "}
      <div className="container mx-auto py-12 px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Header */}
          <div className="md:col-span-2">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={userData?.profilePictureUrl}
                  alt={userData?.fullName || "User Avatar"}
                />
                <AvatarFallback>
                  {userData?.fullName
                    ?.split(" ")
                    .join("")
                    .slice(0, 2)
                    .toUpperCase() || "STD"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold">{userData?.fullName}</h1>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1 text-muted-foreground">
                  <Badge
                    variant="outline"
                    className="bg-blue-50 dark:text-gray-900"
                  >
                    {t("student")}
                  </Badge>
                  <span className="hidden sm:inline">•</span>
                  <span>{userData?.email || t("notProvided")}</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium">{t("userId")}:</span>
                  <span>{userData?.userId}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="font-medium">{t("phoneNumber")}:</span>
                  <span>{userData?.phoneNumber || t("notProvided")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Information */}
          <div className="md:col-span-1">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  {t("joined")}
                </h3>
                <p className="mt-1">
                  {new Date(userData?.createdDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  {t("profileStatus")}
                </h3>
                {/* isApproved: boolean; 
              isLockedOut: boolean; */}
                <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                  <Badge
                    variant={userData?.isApproved ? "default" : "destructive"}
                    className="rounded-full px-3 py-1"
                  >
                    {userData?.isApproved ? t("approved") : t("notApproved")}
                  </Badge>
                  <span className="hidden sm:inline">•</span>
                  <Badge
                    variant={userData?.isLockedOut ? "destructive" : "default"}
                    className="rounded-full px-3 py-1"
                  >
                    {userData?.isLockedOut ? t("lockedOut") : t("active")}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mt-8 ">
          <Tabs defaultValue="about" className="w-full">
            <TabsList
              className={`w-full justify-start  border-b rounded-none h-auto p-0 bg-transparent flex-wrap ${
                locale == "ar" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <TabsTrigger
                value="about"
                className="flex  items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-b-sky-100 py-3 px-4 cursor-pointer"
              >
                <User className="h-4 w-4" />
                <span>{t("aboutMe")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="enrolled"
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-b-sky-100 py-3 px-4 cursor-pointer"
              >
                <BookOpen className="h-4 w-4" />
                <span>{t("enrolledCourses")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="saved"
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-b-sky-100 py-3 px-4 cursor-pointer"
              >
                <Bookmark className="h-4 w-4" />
                <span>{t("savedCourses")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="slides"
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-b-sky-100 py-3 px-4 cursor-pointer"
              >
                <Layers className="h-4 w-4" />
                <span>{t("savedSlides")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-b-sky-100 py-3 px-4 cursor-pointer"
              >
                <MessageSquare className="h-4 w-4" />
                <span>{t("myRecommendations")}</span>
              </TabsTrigger>
            </TabsList>

            {/* About Tab Content */}
            <TabsContent value="about" className="pt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium mb-2">
                    {t("completeProfile")}
                  </h2>
                  <Progress
                    value={33}
                    className="h-2 bg-gray-100 dark:text-gray-900"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    {t("completeProfileDescription")}
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-medium mb-4">{t("about")}</h2>
                  <p className="text-gray-700">
                    Dynamic And Motivated Marketing Professional With A Proven
                    Record Of Generating And Building Relationships, Managing
                    Projects From Concept To Completion, Designing Educational
                    Strategies And Coaching Individuals To Success. Skilled In
                    Building Cross- Functional Teams, Demonstrating Exceptional
                    Communication Skills, And Making Critical Decisions During
                    Challenges. Adaptable And Transformational Leader With An
                    Ability To Work Independently, Creating Effective
                    Presentations, And Developing Opportunities That Further
                    Establish Organizational Goals.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-medium mb-4">{t("skills")}</h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="rounded-full px-3 py-1"
                    >
                      Figma
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="rounded-full px-3 py-1"
                    >
                      Javascript
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="rounded-full px-3 py-1"
                    >
                      Adobe XD
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="rounded-full px-3 py-1"
                    >
                      React js
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Enrolled Courses Tab Content */}
            <TabsContent value="enrolled">
              <div className="py-6">
                <h2 className="text-lg font-medium mb-4">
                  {t("enrolledCourses")}
                </h2>
                <div className="bg-muted/20 p-8 rounded-lg text-center">
                  {enrolledCourses.length > 0 ? (
                    <ul className="space-y-4">
                      {enrolledCourses.map(
                        (
                          course: {
                            courseId: any;
                            thumbnailImageUrl: string | StaticImport;
                            title:
                              | string
                              | number
                              | bigint
                              | boolean
                              | React.ReactElement<
                                  unknown,
                                  string | React.JSXElementConstructor<any>
                                >
                              | Iterable<React.ReactNode>
                              | Promise<
                                  | string
                                  | number
                                  | bigint
                                  | boolean
                                  | React.ReactPortal
                                  | React.ReactElement<
                                      unknown,
                                      string | React.JSXElementConstructor<any>
                                    >
                                  | Iterable<React.ReactNode>
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined;
                          },
                          index: React.Key | null | undefined
                        ) => (
                          <li key={index} className="flex items-center gap-4">
                            <Link
                              href={`/view/${course.courseId}`}
                              className="flex items-center gap-4"
                            >
                              <Image
                                width={64}
                                height={64}
                                src={course.thumbnailImageUrl}
                                alt={`${course.title}` || "Course Thumbnail"}
                                className=" rounded-lg"
                              />
                              <div className="flex flex-col">
                                <h3 className="text-lg font-semibold">
                                  {course.title}
                                </h3>
                              </div>
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">
                      {t("noEnrolledCourses")}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Saved Courses Tab Content */}
            <TabsContent value="saved">
              <div className="py-6">
                <h2 className="text-lg font-medium mb-4">
                  {t("savedCourses")}
                </h2>
                <div className="bg-muted/20 p-8 rounded-lg text-center">
                  <p className="text-muted-foreground">{t("noSavedCourses")}</p>
                </div>
              </div>
            </TabsContent>

            {/* Saved Slides Tab Content */}
            <TabsContent value="slides">
              <div className="py-6">
                <h2 className="text-lg font-medium mb-4">{t("savedSlides")}</h2>
                <div className="bg-muted/20 p-8 rounded-lg text-center">
                  <p className="text-muted-foreground">{t("noSavedSlides")}</p>
                </div>
              </div>
            </TabsContent>

            {/* Recommendations Tab Content */}
            <TabsContent value="recommendations">
              <div className="py-6">
                <h2 className="text-lg font-medium mb-4">
                  {t("myRecommendations")}
                </h2>
                <div className="bg-muted/20 p-8 rounded-lg text-center">
                  <p className="text-muted-foreground">
                    {t("noRecommendations")}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </CheckAuth>
  );
}
