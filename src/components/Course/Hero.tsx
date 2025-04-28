"use client";

import { useTranslations } from "next-intl";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Course } from "@/lib/types";
import TrialContent from "./TrialContent";

type HeroProps = Pick<
  Course,
  | "title"
  | "description"
  | "thumbnailImageUrl"
  | "languageOfInstruction"
  | "createdDate"
  | "lastUpdatedDate"
> & {
  category: string;
};

const Hero = ({
  title,
  description,
  category,
  languageOfInstruction,
  thumbnailImageUrl,
  createdDate,
  lastUpdatedDate,
}: HeroProps) => {
  const [isWatchingPreview, setIsWatchingPreview] = React.useState(false);
  const t = useTranslations("CoursePage");

  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="lg:col-span-2 space-y-8 flex flex-col justify-end">
      <div className="space-y-8">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {languageOfInstruction}
          </Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>

        <p className="text-muted-foreground text-lg">{description}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div>
            <span className="font-medium">{t("createdOn")}: </span>
            {formatDate(createdDate)}
          </div>
          <div>
            <span className="font-medium">{t("lastUpdated")}: </span>
            {formatDate(lastUpdatedDate)}
          </div>
        </div>

        <div className="w-full relative aspect-video rounded-lg overflow-hidden group">
          <Button
            variant="ghost"
            onClick={() => setIsWatchingPreview(true)}
            className="absolute top-1/2 left-1/2 z-10 dark:text-black text-2xl hover:text-white  cursor-pointer w-full h-full  hover:bg-primary transition-all duration-500 ease-in-out hidden group-hover:block -translate-x-1/2 -translate-y-1/2"
          >
            {t("watchPreview")}
          </Button>
          {thumbnailImageUrl && (
            <Image
              src={thumbnailImageUrl}
              alt={title}
              fill
              className="object-contain group-hover:scale-110 transition-all duration-500 ease-in-out"
            />
          )}
          {!thumbnailImageUrl && (
            <Image
              src={"https://picsum.photos/200/300"}
              alt={title}
              className="object-cover"
              fill
            />
          )}
        </div>
      </div>
      <TrialContent
        isWatchingPreview={isWatchingPreview}
        setIsWatchingPreview={setIsWatchingPreview}
        trialContentUrl="https://www.youtube.com/embed/2Vv-BfVoq4g"
      />
    </div>
  );
};

export default Hero;
