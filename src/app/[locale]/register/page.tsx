"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl"; // Importing the t function for translations
const RegisterPage = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    majorId: 0,
    phoneNumber: "",
    profilePictureUrl: "",
  });
  const t = useTranslations("AuthPages");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(formData);
    alert(t("AuthPages.Register.success")); // Assuming a success message key exists
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">{t("Register.title")}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          name="firstName"
          placeholder={t("Register.firstName")}
          onChange={handleChange}
        />
        <Input
          name="lastName"
          placeholder={t("Register.lastName")}
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          placeholder={t("Register.email")}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder={t("Register.password")}
          onChange={handleChange}
        />
        <Input
          name="majorId"
          type="number"
          placeholder={t("Register.majorId")}
          onChange={handleChange}
        />
        <Input
          name="phoneNumber"
          placeholder={t("Register.phoneNumber")}
          onChange={handleChange}
        />
        <Input
          name="profilePictureUrl"
          placeholder={t("Register.profilePictureUrl")}
          onChange={handleChange}
        />
        <Button type="submit">{t("Register.submit")}</Button>
      </form>
      <div className="mt-4 text-sm text-gray-600">
        {t("Register.alreadyHaveAccount")}
        <a href="/login" className="text-blue-500 hover:underline">
          {t("Register.loginHere")}
        </a>
      </div>
    </div>
  );
};

export default RegisterPage;
