"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import type { Course } from "@/lib/types";

type TrialContentProps = Pick<Course, "trialContentUrl"> & {
  isWatchingPreview: boolean;
  setIsWatchingPreview: (isWatchingPreview: boolean) => void;
};

const TrialContent = ({
  trialContentUrl,
  isWatchingPreview,
  setIsWatchingPreview,
}: TrialContentProps) => {
  const t = useTranslations("CoursePage");
  return (
    <Drawer open={isWatchingPreview} onOpenChange={setIsWatchingPreview}>
      <DrawerContent className="h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>{t("previewCourseContent")}</DrawerTitle>
          <DrawerDescription>
            {t("previewCourseContentDescription")}
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 h-full max-h-[70vh]">
          <iframe
            src={trialContentUrl}
            allowFullScreen
            className="w-full h-full rounded-md"
            title="Course Preview"
          />
        </div>
        <DrawerFooter>
          <DrawerClose asChild className="w-1/2 mx-auto">
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default TrialContent;
