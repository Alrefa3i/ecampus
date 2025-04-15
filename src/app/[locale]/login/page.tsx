"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl"; // Importing the t function for translations

const LoginPage = () => {
  const t = useTranslations("AuthPages.Login");
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          />
          <Input
            name="password"
            type="password"
            placeholder={t("password")}
            onChange={handleChange}
          />
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
