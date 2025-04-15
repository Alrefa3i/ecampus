"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl"; // Importing the t function for translations
import { registerFormSchema } from "@/lib/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getColleges, getMajors, getUniversities } from "@/lib/api";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const RegisterPage = () => {
  const { register } = useAuth();
  const locale = useLocale();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    majorId: 0,
    phoneNumber: "",
    profilePictureUrl: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const t = useTranslations("AuthPages");

  // University/College/Major state
  const [universities, setUniversities] = useState<any[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);
  const [majors, setMajors] = useState<any[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("");

  // setUniversities from getUniversities
  useEffect(() => {
    getUniversities()
      .then((data) => setUniversities(data))
      .catch(() => setUniversities([]));
  }, []);

  useEffect(() => {
    if (selectedUniversity) {
      // setColleges from getColleges API function
      getColleges(selectedUniversity)
        .then((data) => setColleges(data))
        .catch(() => setColleges([]));

      setMajors([]);
      setSelectedCollege("");
      setFormData((prev) => ({ ...prev, majorId: 0 }));
    } else {
      setColleges([]);
      setMajors([]);
      setSelectedCollege("");
      setFormData((prev) => ({ ...prev, majorId: 0 }));
    }
  }, [selectedUniversity]);

  useEffect(() => {
    if (selectedCollege) {
      // setMajors from getMajors API function
      getMajors(selectedCollege)
        .then((data) => setMajors(data))
        .catch(() => setMajors([]));
      setFormData((prev) => ({ ...prev, majorId: 0 }));
    } else {
      setMajors([]);
      setFormData((prev) => ({ ...prev, majorId: 0 }));
    }
  }, [selectedCollege]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = registerFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    console.log("Form data:", formData); // Debugging line
    await register(formData);
    toast.success(t("Register.successMessage"), {
      description: t("Register.successDescription"),
    });
    redirect("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">{t("Register.title")}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          name="firstName"
          placeholder={t("Register.firstName")}
          onChange={handleChange}
          value={formData.firstName}
        />
        {errors.firstName && (
          <span className="text-red-500 text-xs">{errors.firstName}</span>
        )}
        <Input
          name="lastName"
          placeholder={t("Register.lastName")}
          onChange={handleChange}
          value={formData.lastName}
        />
        {errors.lastName && (
          <span className="text-red-500 text-xs">{errors.lastName}</span>
        )}
        <Input
          name="email"
          type="email"
          placeholder={t("Register.email")}
          onChange={handleChange}
          value={formData.email}
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email}</span>
        )}
        <Input
          name="password"
          type="password"
          placeholder={t("Register.password")}
          onChange={handleChange}
          value={formData.password}
        />
        {errors.password && (
          <span className="text-red-500 text-xs">{errors.password}</span>
        )}
        <Input
          name="phoneNumber"
          placeholder={t("Register.phoneNumber")}
          onChange={handleChange}
          value={formData.phoneNumber}
        />
        {errors.phoneNumber && (
          <span className="text-red-500 text-xs">{errors.phoneNumber}</span>
        )}
        <Input
          name="profilePictureUrl"
          placeholder={t("Register.profilePictureUrl")}
          onChange={handleChange}
          value={formData.profilePictureUrl}
        />
        {errors.profilePictureUrl && (
          <span className="text-red-500 text-xs">
            {errors.profilePictureUrl}
          </span>
        )}
        {/* University Select */}
        <Select
          value={selectedUniversity}
          onValueChange={(value) => setSelectedUniversity(value)}
          required
        >
          <SelectTrigger
            className={`w-full ${locale === "ar" ? "flex-row-reverse" : ""}`}
          >
            <SelectValue placeholder={t("Register.selectUniversity")} />
          </SelectTrigger>
          <SelectContent>
            {universities.map((u) => (
              <SelectItem key={u.universityId} value={String(u.universityId)}>
                {u.universityName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* College Select */}
        <Select
          value={selectedCollege}
          onValueChange={(value) => setSelectedCollege(value)}
          required
          disabled={!selectedUniversity}
        >
          <SelectTrigger
            className={`w-full ${locale === "ar" ? "flex-row-reverse" : ""}`}
          >
            <SelectValue placeholder={t("Register.selectCollege")} />
          </SelectTrigger>
          <SelectContent>
            {colleges.map((c) => (
              <SelectItem key={c.collegeId} value={String(c.collegeId)}>
                {c.collegeName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Major Select */}
        <Select
          value={formData.majorId ? String(formData.majorId) : ""}
          onValueChange={(value) =>
            setFormData({ ...formData, majorId: Number(value) })
          }
          required
          disabled={!selectedCollege}
        >
          <SelectTrigger
            className={`w-full ${locale === "ar" ? "flex-row-reverse" : ""}`}
          >
            <SelectValue placeholder={t("Register.selectMajor")} />
          </SelectTrigger>
          <SelectContent>
            {majors.map((m) => (
              <SelectItem key={m.majorId} value={String(m.majorId)}>
                {m.majorName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.majorId && (
          <span className="text-red-500 text-xs">{errors.majorId}</span>
        )}
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
