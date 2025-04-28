"use client";
import { Button } from "@/components/ui/button";
import DiscordIcon from "@/components/landing/icons/discord-icon";
import { useTranslations } from "next-intl";

export const CommunitySection = () => {
  const t = useTranslations("Community");

  return (
    <section
      id="community"
      className="container max-w-4xl mx-auto py-24 sm:py-32"
    >
      <div className="rounded-2xl py-10 md:py-16 px-4 md:px-8 border-accent border bg-background-foreground shadow-lg shadow-blue-700/20 dark:shadow-blue-900/20">
        <div className="flex flex-col items-center text-center gap-8">
          <DiscordIcon width={80} height={80} />
          <h2 className="mt-4 text-3xl md:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="max-w-md text-lg mb-8">{t("description")}</p>
          <Button
            asChild
            variant="outline"
            className="bg-background text-background-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <a
              href="https://discord.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("joinButton")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
