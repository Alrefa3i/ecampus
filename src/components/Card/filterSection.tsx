"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
export default function CourseFilters() {
  const t = useTranslations("CoursesPage");
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium">{t("categories")}</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="web-dev" />
            <label
              htmlFor="web-dev"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Web Development
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="frontend" />
            <label
              htmlFor="frontend"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Frontend
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="backend" />
            <label
              htmlFor="backend"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Backend
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="data-science" />
            <label
              htmlFor="data-science"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Data Science
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="design" />
            <label
              htmlFor="design"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Design
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="programming" />
            <label
              htmlFor="programming"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Programming
            </label>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="mb-4 text-lg font-medium">{t("priceRange")}</h3>
        <div className="space-y-4 ">
          <Slider defaultValue={[0, 100]} max={200} step={1} dir="rtl" />
          <div className="flex items-center justify-between" dir="rtl">
            <span className="text-sm">$0</span>
            <span className="text-sm">$200</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="mb-4 text-lg font-medium">{t("duration")}</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="duration-short" />
            <label
              htmlFor="duration-short"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              0-3 hours
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="duration-medium" />
            <label
              htmlFor="duration-medium"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              3-6 hours
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="duration-long" />
            <label
              htmlFor="duration-long"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              6-17 hours
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="duration-xl" />
            <label
              htmlFor="duration-xl"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              17+ hours
            </label>
          </div>
        </div>
      </div>

      <Button className="w-full">{t("applyFilters")}</Button>
    </div>
  );
}
