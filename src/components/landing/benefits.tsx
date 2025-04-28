"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

export const BenefitsSection = () => {
  const t = useTranslations("Benefits");

  // Get benefit items from translations
  const benefitItems = t.raw("items") as Array<{
    title: string;
    description: string;
  }>;

  const benefitList: BenefitsProps[] = benefitItems.map((item, index) => ({
    icon: ["Blocks", "LineChart", "Wallet", "Sparkle"][index % 4],
    title: item.title,
    description: item.description,
    index: index,
  }));

  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">
            {t("sectionTitle")}
          </h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("heading")}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {t("description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description, index }) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  {/* <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  /> */}
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
