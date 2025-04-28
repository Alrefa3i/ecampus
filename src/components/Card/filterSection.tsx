"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

type Category = {
  categoryId: number;
  categoryName: string;
};

type Props = {
  courses: any[];
  setCourses: (courses: any[]) => void;
  categories: Category[];
  reSetCourses?: () => void;
  handleFilterChange?: (filteredCourses: any[]) => void;
};

export default function FilterSection({
  courses,
  setCourses,
  categories,
  reSetCourses = () => {},
  handleFilterChange = () => {},
}: Props) {
  const t = useTranslations("CoursesPage");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const locale = useLocale();
  const maxDuration = Math.max(
    ...courses.map((course) => course.courseDuration || 0),
    50
  );
  // Find max price from all courses for the slider
  const maxPrice = Math.max(
    ...courses.map((course) => course.currentPrice || 0),
    100
  );

  // Price range filter state
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);

  // Course duration filter state (in hours)
  const [durationRange, setDurationRange] = useState<[number, number]>([
    0,
    maxDuration,
  ]);

  const handleCategoryChange = (categoryId: number, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    }
  };

  const applyFilters = () => {
    // Start with all courses
    let filteredCourses = [...courses];

    // Apply category filter if any categories are selected
    if (selectedCategories.length > 0) {
      filteredCourses = filteredCourses.filter((course) => {
        return selectedCategories.includes(course.categoryId as number);
      });
    }

    // Apply price range filter
    filteredCourses = filteredCourses.filter(
      (course) =>
        course.currentPrice >= priceRange[0] &&
        course.currentPrice <= priceRange[1]
    );

    // Apply duration filter
    filteredCourses = filteredCourses.filter(
      (course) =>
        course.courseDuration >= durationRange[0] &&
        course.courseDuration <= durationRange[1]
    );

    // Update courses state
    if (filteredCourses.length > 0) {
      setCourses(filteredCourses);
      handleFilterChange(filteredCourses);
    } else {
      // If no courses match the filters, show a message or handle as needed
      setCourses([]);
      handleFilterChange([]);
    }
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, maxPrice]);
    setDurationRange([0, maxDuration]);
    reSetCourses();
  };

  return (
    <div className="space-y-6">
      {/* Categories Filter */}
      <div>
        <h3 className="mb-4 text-lg font-medium">{t("categories")}</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.categoryId}
              className="flex items-center space-x-2"
            >
              <Checkbox
                id={`category-${category.categoryId}`}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category.categoryId, checked as boolean)
                }
                checked={selectedCategories.includes(category.categoryId)}
              />
              <label
                htmlFor={`category-${category.categoryId}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.categoryName}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="mb-4 text-lg font-medium">{t("priceRange")}</h3>
        <div className="space-y-4">
          <Slider
            defaultValue={[0, maxPrice]}
            value={priceRange}
            max={maxPrice}
            step={1}
            locale={locale}
            minStepsBetweenThumbs={1}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="py-4"
          />
          <div className="flex items-center justify-between">
            <span>
              {priceRange[0]} {t("currency")}
            </span>
            <span>
              {priceRange[1]} {t("currency")}
            </span>
          </div>
        </div>
      </div>

      {/* Duration Filter */}
      <div>
        <h3 className="mb-4 text-lg font-medium">{t("duration")}</h3>
        <div className="space-y-4">
          <Slider
            defaultValue={[0, maxDuration]}
            value={durationRange}
            max={maxDuration}
            step={1}
            locale={locale}
            minStepsBetweenThumbs={1}
            onValueChange={(value) =>
              setDurationRange(value as [number, number])
            }
            className="py-4"
          />
          <div className="flex items-center justify-between">
            <span>
              {durationRange[0]} {t("hours")}
            </span>
            <span>
              {durationRange[1]} {t("hours")}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Button className="w-full" onClick={applyFilters}>
          {t("applyFilters")}
        </Button>
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          {t("resetFilters")}
        </Button>
      </div>
    </div>
  );
}
