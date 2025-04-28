"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Code,
  GraduationCap,
  Users,
  Briefcase,
  Award,
  Clock,
  Zap,
  Star,
  ChevronRight,
  Check,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const ECampusContent = () => {
  const t = useTranslations("AboutPage");
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation classes based on mount state
  const fadeIn = mounted
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-10";
  const staggerDelay = (index: number) => ({
    transitionDelay: `${150 * index}ms`,
  });

  return (
    <div className="w-full " dir="rtl">
      {/* Hero Section */}
      <div className="relative overflow-hidden  flex justify-evenly">
        <div className="w-1/2 flex justify-end items-center">
          <Image
            src="/logo.svg"
            alt={t("hero.imageAlt")}
            width={400}
            height={200}
          />
        </div>
        <div
          className={`container mx-auto px-6 py-16 relative transition-all duration-700 ${fadeIn} w-1/2 my-auto`}
        >
          <div className="max-w-3xl my-auto mr-auto">
            <h1 className="text-4xl font-bold mb-4">{t("hero.title")}</h1>
            <p className="text-xl mb-6">{t("hero.subtitle")}</p>
            <p className="text-lg mb-8">{t("hero.description")}</p>
            <div className="flex gap-4 justify-start">
              <Button className="bg-background text-foreground hover:bg-secondary">
                {t("hero.joinAsStudent")}
              </Button>
              <Button variant="ghost" className=" border-primary-foreground ">
                {t("hero.joinAsInstructor")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="container mx-auto px-6 py-16">
        <div className={`transition-all duration-700 delay-300 ${fadeIn}`}>
          <h2 className="text-2xl font-bold mb-10 text-primary text-center relative after:content-[''] after:absolute after:w-20 after:h-1 after:bg-primary after:bottom-0 after:right-1/2 after:transform after:translate-x-1/2 after:mt-2 pb-4">
            {t("about.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-primary">
                {t("about.vision.title")}
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                {t("about.vision.description")}
              </p>

              <h3 className="text-xl font-semibold mb-4 text-primary">
                {t("about.mission.title")}
              </h3>
              <p className="text-foreground/80 leading-relaxed">
                {t("about.mission.description")}
              </p>
            </div>

            <Card className="border border-border shadow-md overflow-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 text-primary flex items-center">
                  <Award className="ml-2 text-primary" size={24} />
                  {t("features.title")}
                </h3>

                <ul className="space-y-4">
                  {[
                    {
                      icon: <Clock size={18} />,
                      text: t("features.flexible"),
                    },
                    {
                      icon: <Star size={18} />,
                      text: t("features.quality"),
                    },
                    {
                      icon: <Award size={18} />,
                      text: t("features.certified"),
                    },
                    {
                      icon: <Users size={18} />,
                      text: t("features.personalized"),
                    },
                    {
                      icon: <Briefcase size={18} />,
                      text: t("features.network"),
                    },
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center text-foreground/80 transition-all duration-300 transform translate-y-0 hover:-translate-y-1"
                      style={staggerDelay(index)}
                    >
                      <span className="text-primary ml-3 flex-shrink-0">
                        {item.icon}
                      </span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-10 text-primary text-center">
            {t("join.title")}
          </h2>

          <Tabs defaultValue="students" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="students" className="text-lg py-3">
                <GraduationCap className="ml-2" size={18} />
                {t("join.tabs.students")}
              </TabsTrigger>
              <TabsTrigger value="coaches" className="text-lg py-3 ">
                <Users className="ml-2" size={18} />
                {t("join.tabs.instructors")}
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="students"
              className="animate-in fade-in-50 zoom-in-95 bg-card text-card-foreground rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-semibold mb-4 text-primary">
                {t("students.title")}
              </h3>
              <p className="text-card-foreground/80 mb-6">
                {t("students.description")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {[
                  {
                    icon: <BookOpen size={20} />,
                    title: t("students.benefits.learn.title"),
                    desc: t("students.benefits.learn.description"),
                  },
                  {
                    icon: <Briefcase size={20} />,
                    title: t("students.benefits.opportunities.title"),
                    desc: t("students.benefits.opportunities.description"),
                  },
                  {
                    icon: <Code size={20} />,
                    title: t("students.benefits.projects.title"),
                    desc: t("students.benefits.projects.description"),
                  },
                  {
                    icon: <Award size={20} />,
                    title: t("students.benefits.certificates.title"),
                    desc: t("students.benefits.certificates.description"),
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className="border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                  >
                    <CardContent className="p-4">
                      <div className="text-primary mb-3">{item.icon}</div>
                      <h4 className="text-base font-semibold mb-2">
                        {item.title}
                      </h4>
                      <p className="text-card-foreground/70 text-sm">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {t("students.registerButton")}
                <ChevronRight className="mr-2" size={16} />
              </Button>
            </TabsContent>

            <TabsContent
              value="coaches"
              className="animate-in fade-in-50 zoom-in-95 bg-card text-card-foreground rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-semibold mb-4 text-primary">
                {t("instructors.title")}
              </h3>
              <p className="text-card-foreground/80 mb-6">
                {t("instructors.description")}
              </p>

              <div className="space-y-3 mb-6">
                {(t.raw("instructors.benefits") as string[]).map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-secondary/30 rounded-md transition-all duration-300 transform translate-y-0 hover:-translate-y-1"
                      style={staggerDelay(index)}
                    >
                      <Check className="ml-3 text-primary" size={18} />
                      <span className="text-card-foreground/80">{item}</span>
                    </div>
                  )
                )}
              </div>

              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {t("instructors.joinButton")}
                <ChevronRight className="mr-2" size={16} />
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container mx-auto px-6">
        <Card className="bg-primary/10 border border-primary/20 shadow-md overflow-hidden">
          <CardContent className="p-8 relative">
            <h2 className="text-2xl font-bold mb-4 text-center text-primary">
              {t("cta.title")}
            </h2>
            <p className="text-lg mb-6 text-center text-foreground/80 max-w-2xl mx-auto">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {t("cta.exploreCourses")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                {t("cta.contactUs")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default ECampusContent;
