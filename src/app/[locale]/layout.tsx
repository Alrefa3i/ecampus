import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";
import Header from "@/components/Header";
import { Providers } from "@/components/providers/providers";
import { Tajawal } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";
const tajawal = Tajawal({
  subsets: ["latin"],
  variable: "--font-tajawal",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

// SEO
export const metadata = {
  title: "eCamups Platform",
  description:
    "eCampus Platform is a web application that provides a comprehensive solution for managing university and college campuses. It offers features such as course management, student enrollment, attendance tracking, and more.",
  icons: {
    icon: "/logo.svg",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>

      <body className={`${tajawal.variable} font-sans `}>
        <Providers>
          <Header />
          {children}
          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
