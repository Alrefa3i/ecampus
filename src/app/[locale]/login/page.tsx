"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl"; // Importing the t function for translations
import { loginFormSchema } from "@/lib/types";
const LoginPage = () => {
  const t = useTranslations("AuthPages.Login");
  const { login, user } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      window.location.href = "/profile"; // Redirect to profile page if user is logged in
    }
  }, [user]);

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
    await login(formData.email, formData.password);
    alert(t("success")); // Assuming a success message key exists
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className=" w-1/3 h-96 mx-auto mt-10 p-6 bg-white shadow-md rounded-md flex flex-col gap-2">
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
          <Button type="submit">{t("submit")}</Button>
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
