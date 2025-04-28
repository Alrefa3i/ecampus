"use client";
import { useTranslations } from "next-intl";
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import React from "react";

const LearningObjectives = ({ objectives }: { objectives: string[] }) => {
  const t = useTranslations("CoursePage");
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">
          {t("learningObjectives")}
        </CardTitle>
        <span className="text-xs text-muted-foreground">
          {t("learningObjectivesDescription")}
        </span>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {objectives.map((objective, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span>{objective}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default LearningObjectives;
