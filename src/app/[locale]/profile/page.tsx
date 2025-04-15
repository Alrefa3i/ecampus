"use client";

import React, { useEffect, useState } from "react";
import { getUserById } from "@/lib/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl"; // Importing the t function for translations

const ProfilePage = () => {
  const t = useTranslations("AuthPages.Profile");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("authToken"); // Get the token from session storage
      if (!token) {
        return; // Handle the case where the token is not available
      }
      const userData = await getUserById(token);
      setUser(userData);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>no</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>{t("fullName")}:</strong> {user.fullName}
          </p>
          <p>
            <strong>{t("email")}:</strong> {user.email}
          </p>
          <p>
            <strong>{t("phoneNumber")}:</strong> {user.phoneNumber}
          </p>
          <p>
            <strong>{t("dateOfBirth")}:</strong> {user.dateOfBirth}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
