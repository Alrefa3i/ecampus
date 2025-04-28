"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const is = [
  "TabletSmartphone",
  "BadgeCheck",
  "Goal",
  "PictureInPicture",
  "MousePointerClick",
  "Newspaper",
];

export const FeaturesSection = () => {
  const t = useTranslations("Features");

  // Get features from translations
  const featureItems = t.raw("items") as Array<{
    title: string;
    description: string;
  }>;

  const featureList: FeaturesProps[] = featureItems.map((item, index) => ({
    icon: is[index % is.length],
    title: item.title,
    description: item.description,
  }));

  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        {t("sectionTitle")}
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        {t("heading")}
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        {t("description")}
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center flex-col text-center ">
                <div className="bg-gray-400/20 p-2 rounded-full ring-8 ring-accent mb-4 hover:scale-105 transition-transform duration-300 ease-in-out ">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    className="text-[#f49819] "
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
