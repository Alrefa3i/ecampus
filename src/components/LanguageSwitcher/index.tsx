import React from "react";
import { useLocale } from "next-intl";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { routing } from "@/i18n/routing";
import { useRouter } from "@/i18n/navigation";

const localeNames: Record<string, string> = {
  en: "English",
  ar: "العربية",
};

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    // Remove an existing locale prefix from the path if present.
    const localePrefixRegex = new RegExp(
      `^/(${routing.locales.join("|")})(?=/|$)`
    );
    const cleanPath = pathname.replace(localePrefixRegex, "") || "/";
    router.replace(cleanPath, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 cursor-pointer"
        >
          <Globe className="h-4 w-4" />
          <span>{localeNames[locale] || locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={locale === loc ? "bg-accent font-medium" : ""}
          >
            {localeNames[loc] || loc}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
