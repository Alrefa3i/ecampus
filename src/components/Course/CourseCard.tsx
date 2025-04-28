"use client";
import { useTranslations } from "next-intl";
import React from "react";
import type { Course } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CopyCheck } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

type CourseCardProps = Pick<
  Course,
  "originalPrice" | "currentPrice" | "courseDuration" | "totalEnrollments"
>;

const CourseCard = ({
  originalPrice,
  currentPrice,
  courseDuration,
  totalEnrollments,
}: CourseCardProps) => {
  const t = useTranslations("CoursePage");
  const params = useParams();
  const courseID = params.courseID as string;

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success(t("linkCopied"), {
        description: t("linkCopiedDescription"),
      });
    });
  };

  return (
    <div className="lg:row-start-1 lg:col-start-3">
      <div className="w-full border-2 p-2 my-auto mt-0 space-y-4 rounded-lg bg-base-200">
        <div className="text-center text-2xl py-4 flex justify-center items-end gap-2">
          <span className="text-sm line-through">{originalPrice}</span>
          <span className="text-3xl font-bold">
            {currentPrice}
            <span className="text-xs font-normal">{t("currency")}</span>
          </span>
        </div>
        <div className="divider py-0 my-0"></div>
        <div className="">
          <div className="flex justify-between items-center py-3">
            <p className="text-sm font-bold opacity-70">
              {courseDuration} {t("hours")}
            </p>
            <div className="flex items-center gap-2 text-base">
              <p>{t("CourseDuration")}</p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                  stroke="#A1A5B3"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
                <path
                  d="M12 6.75V12H6.75"
                  stroke="#A1A5B3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="flex justify-between items-center py-3">
            <p className="text-sm font-bold opacity-70">
              {totalEnrollments} {t("student")}
            </p>
            <div className="flex items-center gap-2">
              <p>{t("students")}</p>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.75 15C13.0576 15 10.875 12.8174 10.875 10.125C10.875 7.43261 13.0576 5.25 15.75 5.25C18.4424 5.25 20.625 7.43261 20.625 10.125C20.625 12.8174 18.4424 15 15.75 15Z"
                  stroke="#A1A5B3"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                />
                <path
                  d="M9.42969 5.43161C8.75917 5.24269 8.05595 5.19966 7.3674 5.3054C6.67885 5.41114 6.02095 5.66321 5.43802 6.04462C4.85509 6.42604 4.36066 6.92795 3.98804 7.51654C3.61541 8.10513 3.37325 8.76673 3.27785 9.45679C3.18245 10.1469 3.23604 10.8493 3.435 11.517C3.63396 12.1846 3.97368 12.8018 4.43127 13.327C4.88886 13.8523 5.45369 14.2734 6.08773 14.562C6.72177 14.8506 7.41029 14.9999 8.10691 15"
                  stroke="#A1A5B3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.5 18.5059C21.7386 17.4229 20.7279 16.539 19.553 15.9288C18.3782 15.3186 17.0738 15.0001 15.7499 15C14.4261 14.9999 13.1216 15.3184 11.9468 15.9285C10.7719 16.5386 9.76103 17.4225 8.99958 18.5054"
                  stroke="#A1A5B3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.10742 15C6.78345 14.999 5.47874 15.3171 4.30376 15.9273C3.12878 16.5375 2.11814 17.4218 1.35739 18.5054"
                  stroke="#A1A5B3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="flex justify-center flex-col items-center gap-5">
          <Button
            variant={"default"}
            className="w-2/3 mx-auto cursor-pointer"
            asChild
          >
            <Link href={`/${params.locale}/courses/${courseID}/payment`}>
              {t("enrollNow")}
            </Link>
          </Button>
        </div>
        <div className="divider"></div>

        {/* static content */}
        <div className="space-y-4">
          <h2 className="card-title">{t("courseIncludes")}</h2>

          <ul className="list-none space-y-2 pt-3">
            <li className="flex text-sm items-center gap-2">
              <span className="mt-1.5 mr-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                    stroke="#FF6636"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M12 6.75V12H6.75"
                    stroke="#FF6636"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="opacity-70">{t("recordedVideos")}</span>
            </li>

            <li className="flex text-sm items-center gap-2  ">
              <span className="mt-1.5 mr-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2.25V4.5"
                    stroke="#FF6636"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 19.5V21.75"
                    stroke="#FF6636"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.25 8.25C17.25 7.75754 17.153 7.26991 16.9645 6.81494C16.7761 6.35997 16.4999 5.94657 16.1517 5.59835C15.8034 5.25013 15.39 4.97391 14.9351 4.78545C14.4801 4.597 13.9925 4.5 13.5 4.5H10.125C9.13044 4.5 8.17661 4.89509 7.47335 5.59835C6.77009 6.30161 6.375 7.25544 6.375 8.25C6.375 9.24456 6.77009 10.1984 7.47335 10.9017C8.17661 11.6049 9.13044 12 10.125 12H14.25C15.2446 12 16.1984 12.3951 16.9017 13.0983C17.6049 13.8016 18 14.7554 18 15.75C18 16.7446 17.6049 17.6984 16.9017 18.4017C16.1984 19.1049 15.2446 19.5 14.25 19.5H9.75C8.75544 19.5 7.80161 19.1049 7.09835 18.4017C6.39509 17.6984 6 16.7446 6 15.75"
                    stroke="#FF6636"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="opacity-70">{t("moneyBackGuarantee")}</span>
            </li>

            <li className="flex text-sm items-center gap-2  ">
              <span className="mt-1.5 mr-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 10.5H7.5"
                    stroke="#FF6636"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.5 13.5H7.5"
                    stroke="#FF6636"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.5 3.75H19.5C19.9142 3.75 20.25 4.08579 20.25 4.5V19.5C20.25 19.9142 19.9142 20.25 19.5 20.25H4.5C4.08579 20.25 3.75 19.9142 3.75 19.5V4.5C3.75 4.08579 4.08579 3.75 4.5 3.75Z"
                    stroke="#FF6636"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.5 3.75V20.25"
                    stroke="#FF6636"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="opacity-70">{t("freeTestsAssignments")}</span>
            </li>

            <li className="flex text-sm items-center gap-2  ">
              <span className="mt-1.5 mr-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.75 5.25V10.4153C18.75 14.1372 15.773 17.2222 12.0512 17.2498C11.1605 17.2566 10.2772 17.087 9.45239 16.7508C8.62754 16.4146 7.87738 15.9185 7.24516 15.291C6.61294 14.6636 6.11115 13.9172 5.76872 13.0949C5.4263 12.2727 5.25 11.3907 5.25 10.5V5.25C5.25 5.05109 5.32902 4.86032 5.46967 4.71967C5.61032 4.57902 5.80109 4.5 6 4.5H18C18.1989 4.5 18.3897 4.57902 18.5303 4.71967C18.671 4.86032 18.75 5.05109 18.75 5.25Z"
                    stroke="#FF6636"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 21H9"
                    stroke="#FF6636"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 17.25V21"
                    stroke="#FF6636"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.41699 12H4.49971C3.70406 12 2.941 11.6839 2.37839 11.1213C1.81578 10.5587 1.49971 9.79565 1.49971 9V7.5C1.49971 7.30109 1.57872 7.11032 1.71938 6.96967C1.86003 6.82902 2.05079 6.75 2.24971 6.75H5.24971"
                    stroke="#FF6636"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.5657 12H19.5117C20.3074 12 21.0704 11.6839 21.633 11.1213C22.1956 10.5587 22.5117 9.79565 22.5117 9V7.5C22.5117 7.30109 22.4327 7.11032 22.292 6.96967C22.1514 6.82902 21.9606 6.75 21.7617 6.75H18.7617"
                    stroke="#FF6636"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="opacity-70">{t("certifiedCertificate")}</span>
            </li>

            <li className="flex text-sm items-center gap-2  ">
              <span className="mt-1.5 mr-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 16.5L12 21.75L3 16.5"
                    stroke="#FF6636"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12L12 17.25L3 12"
                    stroke="#FF6636"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 7.5L12 12.75L3 7.5L12 2.25L21 7.5Z"
                    stroke="#FF6636"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="opacity-70">{t("fullyOnline")}</span>
            </li>
          </ul>
        </div>

        {/* end of static content */}

        <div className="divider"></div>
        <div className="">
          <h2 className="card-title">{t("shareWithFriend")} </h2>
          <div className="pt-3 flex gap-2">
            <div className="bg-base-200 w-fit p-3 ">
              <i className="fa-brands fa-facebook text-xl"></i>
            </div>
            <div className="bg-base-200 w-fit p-3">
              <i className="fa-solid fa-message text-xl"></i>
            </div>
            <div className="bg-base-200 w-fit p-3">
              <i className="fa-brands fa-twitter text-xl"></i>
            </div>
            <div className="bg-base-200 w-fit p-3">
              <i className="fa-brands fa-whatsapp text-xl"></i>
            </div>
            <div
              onClick={handleCopy}
              className="p-3 flex items-center gap-4 cursor-pointer hover:bg-background/50 hover:text-xl transition-all duration-300 ease-in-out"
            >
              <p className="text-sm">{t("copyLink")}</p>
              <CopyCheck className="text-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
