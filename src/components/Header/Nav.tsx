"use client";

import { useTranslations } from "next-intl";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { LogIn, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";

import { ModeToggle } from "@/components/ThemeToggle";
import LanguageSwitcher from "../LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("Header");
  const links = ["home", "about", "courses", "contact"];
  const { user, logout } = useAuth();

  return (
    <header className=" top-0 sticky z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image
            src="/logo.svg"
            className="transition-opacity duration-300 hover:opacity-70"
            width={40}
            height={40}
            alt="Shadcnblocks Logo"
          />
          <span className="text-lg tracking-tight">eCamups</span>
        </Link>

        {/* Navigation Links - Desktop */}
        <div className="hidden items-center space-x-8 md:flex ">
          {links.map((link, index) => (
            <Link
              key={index}
              href={`/${link === "home" ? "" : link}`}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t(`Navigation.${link}`)}
            </Link>
          ))}
        </div>
        <div className="ml-4 flex items-center gap-4">
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden md:flex cursor-pointer"
              onClick={logout}
            >
              <div className="flex items-center gap-2">
                <LogOut className="h-6 w-6" />
                <span className="md:flex hidden">{t("Auth.logout")}</span>
              </div>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden md:flex cursor-pointer"
            >
              <Link href="/login" className="flex items-center gap-2">
                <LogIn className="h-6 w-6" />
                <span className="md:flex hidden">{t("Auth.login")}</span>
              </Link>
            </Button>
          )}
          <ModeToggle />
          <LanguageSwitcher />

          <Drawer>
            <DrawerTrigger className="md:hidden md:px-4  cursor-pointer ">
              <Menu className="h-6 w-6" />
            </DrawerTrigger>
            <DrawerContent className="h-48">
              <DrawerHeader className="flex items-center justify-between">
                <DrawerTitle>{t("title")}</DrawerTitle>
                <DrawerClose />
              </DrawerHeader>
              <div className="grid grid-cols-2 gap-4 place-items-center">
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href={"/link"}
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    {t(`Navigation.${link}`)}
                  </Link>
                ))}
                {user ? (
                  <Button variant="ghost" size="sm" asChild onClick={logout}>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <LogOut className="h-6 w-6" />
                      <span>{t("Auth.logout")}</span>
                    </div>
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" asChild>
                    <Link
                      href="/login"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <LogIn className="h-6 w-6" />
                      <span>{t("Auth.login")}</span>
                    </Link>
                  </Button>
                )}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
