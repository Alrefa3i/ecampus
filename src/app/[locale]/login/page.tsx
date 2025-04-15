"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl"; // Importing the t function for translations
import { loginFormSchema } from "@/lib/types";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const t = useTranslations("AuthPages.Login");
  const router = useRouter();
  const { login, user } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    await login(
      formData.email,
      formData.password,
      t("successMessage"),
      t("successDescription")
    );
  };
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-gray-100 dark:bg-background ">
      <div className=" w-1/3 h-96 mx-auto mt-10 p-6  shadow-md rounded-md flex flex-col gap-2 bg-accent">
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
          <p className="text-sm text-gray-600 mb-4">{t("welcomeBack")}</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="email"
            type="email"
            placeholder={t("email")}
            onChange={handleChange}
            value={formData.email}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email}</span>
          )}
          <Input
            name="password"
            type="password"
            placeholder={t("password")}
            onChange={handleChange}
            value={formData.password}
          />
          {errors.password && (
            <span className="text-red-500 text-xs">{errors.password}</span>
          )}
          <Button className="cursor-pointer" type="submit">
            {t("submit")}
          </Button>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          {t("noAccount")}{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            {t("registerHere")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
