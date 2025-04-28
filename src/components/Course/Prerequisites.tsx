"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
const Prerequisites = ({ prerequisites }: { prerequisites: string[] }) => {
  const t = useTranslations("CoursePage");

  if (!prerequisites || prerequisites.length === 0) {
    return;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex  gap-2 flex-col w-full text-lg font-bold">
          {t("courseRequirements")}
          <span className="text-xs text-muted-foreground">
            {t("courseRequirementsDescription")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-1 px-8">
          {prerequisites.map((prerequisite, index) => (
            <li key={index} className="text-base text-muted-foreground">
              {prerequisite}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Prerequisites;
