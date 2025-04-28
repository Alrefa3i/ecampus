"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowLeft, BadgeCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  payForCourse,
  getCourseInformation,
  getServerAuthStatus,
} from "@/lib/api";
import { PaymentFormData, Course } from "@/lib/types";
import { toast } from "sonner";
import { checkAuth } from "@/lib/auth-utils";

export default function PaymentPage() {
  const t = useTranslations("PaymentPage");
  const tc = useTranslations("CoursePage");
  const router = useRouter();
  const params = useParams();
  const courseID = params.courseID as string;

  const [isLoading, setIsLoading] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentForm, setPaymentForm] = useState<PaymentFormData>({
    studentId: 0,
    courseId: 0,
    prepaidCardCode: "",
    couponCode: "",
    referralCode: undefined,
  });

  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(false);

  // Fetch course information
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await getCourseInformation(courseID);
        const { isAuthenticated, user } = await checkAuth();
        console.log("User Authenticated:", isAuthenticated, user);
        if (!isAuthenticated || !user) {
          router.push(`/${params.locale}/login`);
          return;
        }
        setCourse(courseData);
        setPaymentForm((prev) => ({
          ...prev,
          courseId: courseData.courseId,
          studentId: parseInt(user.nameid),
        }));
      } catch (error) {
        console.error("Error fetching course:", error);
        toast.error(t("paymentFailed"), {
          description: t("paymentFailedDescription"),
        });
      }
    };

    if (courseID) {
      fetchCourse();
    }
  }, [courseID]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "referralCode") {
      // Convert string to number or undefined if empty
      const numValue = value ? parseInt(value) : undefined;
      setPaymentForm((prev) => ({ ...prev, [name]: numValue }));
    } else {
      setPaymentForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const applyCoupon = () => {
    // This would typically check the coupon against an API
    // For now, we'll simulate a discount
    if (paymentForm.couponCode && paymentForm.couponCode.length > 0) {
      // Simulate a discount of 10%
      //   const discountAmount = course ? course.currentPrice * 0.1 : 0;
      //   setDiscount(discountAmount);
      //   setAppliedCoupon(true);
      //   toast.success(t("couponApplied"), {
      //     description: `${t("discountAmount")}: ${discountAmount.toFixed(2)} ${t(
      //       "currency"
      //     )}`,
      //   });
      toast.error(t("invalidCoupon"));
    } else {
      toast.error(t("invalidCoupon"));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Only include non-empty fields
      const paymentData = {
        ...paymentForm,
        prepaidCardCode: paymentForm.prepaidCardCode || undefined,
        couponCode: paymentForm.couponCode || undefined,
      };

      const result = await payForCourse(paymentData);

      if (result.success) {
        setPaymentSuccess(true);
        toast.success(t("paymentSuccessful"), {
          description: t("paymentSuccessfulDescription"),
        });
      } else {
        toast.error(t("paymentFailed"), {
          description: t("paymentFailedDescription"),
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(t("paymentFailed"), {
        description: t("paymentFailedDescription"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goBackToCourse = () => {
    router.push(`/${params.locale}/courses/${courseID}`);
  };

  const goToCourse = () => {
    // Redirect to the enrolled course
    router.push(`/${params.locale}/profile`);
  };

  const continueShopping = () => {
    router.push(`/${params.locale}/courses`);
  };

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-40">
          <p className="text-center text-muted-foreground">
            {t("paymentProcessing")}
          </p>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-green-100 p-3">
                <BadgeCheck className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-center">
              {t("paymentSuccessful")}
            </CardTitle>
            <CardDescription className="text-center">
              {t("paymentSuccessfulDescription")}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-4 justify-center">
            <Button onClick={goToCourse}>{t("goToCourse")}</Button>
            <Button variant="outline" onClick={continueShopping}>
              {t("continueShopping")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={goBackToCourse}
          className="mb-6 hover:bg-transparent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("backToCourse")}
        </Button>

        <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
        <p className="text-muted-foreground mb-8">{t("subtitle")}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Course Information Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>{t("courseDetails")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video relative overflow-hidden rounded-md mb-4">
                <Image
                  src={course.thumbnailImageUrl || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold">{t("courseName")}</h3>
                <p>{course.title}</p>
              </div>
              <div>
                <h3 className="font-bold">{t("coursePrice")}</h3>
                <p className="text-lg">
                  {course.currentPrice.toFixed(2)} {t("currency")}
                </p>
              </div>
              <div>
                <h3 className="font-bold">{tc("CourseDuration")}</h3>
                <p>
                  {course.courseDuration.toFixed(2)} {tc("hours")}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("paymentOptions")}</CardTitle>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {/* Prepaid Card */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t("prepaidCard")}
                    </label>
                    <Input
                      name="prepaidCardCode"
                      placeholder={t("prepaidCardPlaceholder")}
                      value={paymentForm.prepaidCardCode}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Coupon Code */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t("couponCode")}
                    </label>
                    <div className="flex gap-2">
                      <Input
                        name="couponCode"
                        placeholder={t("couponCodePlaceholder")}
                        value={paymentForm.couponCode}
                        onChange={handleInputChange}
                        disabled={appliedCoupon}
                      />
                      <Button
                        type="button"
                        onClick={applyCoupon}
                        disabled={!paymentForm.couponCode || appliedCoupon}
                      >
                        {t("applyCoupon")}
                      </Button>
                    </div>
                  </div>

                  {/* Referral Code */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t("referralCode")}
                    </label>
                    <Input
                      name="referralCode"
                      placeholder={t("referralCodePlaceholder")}
                      value={paymentForm.referralCode || ""}
                      onChange={handleInputChange}
                      type="number"
                    />
                  </div>

                  {/* Payment Summary */}
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">
                      {t("paymentSummary")}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>{t("originalPrice")}</span>
                        <span>
                          {course.originalPrice.toFixed(2)} {t("currency")}
                        </span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>{t("discountAmount")}</span>
                          <span>
                            -{discount.toFixed(2)} {t("currency")}
                          </span>
                        </div>
                      )}
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold gap-4">
                        <span>{t("finalPrice")}</span>
                        <span>
                          {(course.currentPrice - discount).toFixed(2)}{" "}
                          {t("currency")}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="my-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? t("paymentProcessing") : t("proceedToPayment")}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
