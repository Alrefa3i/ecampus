"use client";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Users } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  id: string;
  title: string;
  image: string;
  instructor: string;
  price: number;
  rating: number;
  students: number;
  category: string;
  hours?: number;
  isUserEnrolled?: boolean;
}

// check image url if it is valid or not
function isValidImageUrl(url: string): boolean {
  return url.startsWith("http") || url.startsWith("/");
}

export default function CourseCard({
  id,
  title,
  image,
  instructor,
  price,
  rating,
  students,
  category,
  hours = 1.5,
  isUserEnrolled = false,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md !p-0">
      <div className="aspect-video relative overflow-hidden">
        {isValidImageUrl(image) ? (
          <div className="relative h-full w-full">
            <Image src={image} alt={title} fill className="object-cover" />
            <div className="absolute bottom-4 left-0 flex w-full justify-center gap-2">
              {isUserEnrolled ? (
                <Button asChild className="rounded-full">
                  <Link href={`/view/${id}`} className="w-3/4 mx-auto">
                    Show Course Content
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="secondary" className="rounded-full">
                    <Link href={`/courses/${id}`}>View Course</Link>
                  </Button>
                  <Button className="rounded-full">
                    <Link href={`/courses/${id}/payment`}>Enroll Now</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 h-full items-center justify-center bg-muted">
            <div className="flex w-full justify-center items-end gap-2 ">
              {isUserEnrolled ? (
                <Button asChild className="rounded-full w-3/4 mx-auto">
                  <Link href={`/view/${id}`}>Show Course Content</Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="secondary" className="rounded-full">
                    <Link href={`/courses/${id}`}>View Course</Link>
                  </Button>
                  <Button className="rounded-full">
                    <Link href={`/courses/${id}/payment`}>Enroll Now</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className=" text-center">
        <div className="text-3xl font-bold text-foreground">
          ${price.toFixed(2)}
        </div>
        <div className="mt-1 flex items-center justify-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(rating)
                  ? "fill-primary text-primary"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
          <span className="ml-1 text-sm text-muted-foreground">
            &nbsp; ({rating})
          </span>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="line-clamp-2 text-xl font-bold text-center">{title}</h3>
      </CardContent>

      <CardFooter className="flex items-center justify-around border-t p-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-1 h-4 w-4" />
          &nbsp;
          <span>{students}&nbsp; Students</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-4 w-4" />
          &nbsp;
          <span>{hours.toFixed(2)} Hrs</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <span>{instructor}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
