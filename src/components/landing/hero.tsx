"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import image1 from "./hero-image-light.jpeg";
import image2 from "./hero-image-dark.jpeg";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export const HeroSection = () => {
  const { theme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const t = useTranslations("Hero");
  useEffect(() => {
    // Check theme only on client side
    setIsDarkTheme(
      theme === "dark" ||
        (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  }, [theme]);

  const imageSrc = isDarkTheme ? image2 : image1;
  return (
    <section className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2">
            <span className="mr-2 text-primary">
              <Badge>{t("badge")}</Badge>
            </span>
            <span>{t("badgeText")}</span>
          </Badge>

          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>{t("heading")}</h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {t("description")}
          </p>

          <div className="flex  gap-4 justify-center flex-col md:flex-row items-center">
            <Button className="w-5/6 md:w-1/4 font-bold group/arrow">
              <Link href="#projects" className="flex" target="_blank">
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
                {t("getStartedButton")}
              </Link>
            </Button>

            <Button
              asChild
              variant="secondary"
              className="w-5/6 md:w-1/4 font-bold group/arrow"
            >
              <Link href="#contact" className="flex" target="_blank">
                {t("contactButton")}
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative group mt-14">
          <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
          <Image
            width={1200}
            height={1200}
            className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 "
            src={imageSrc}
            alt="dashboard"
          />

          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>  
      </div>
    </section>
  );
};
