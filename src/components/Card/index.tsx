"use client";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  instructor: string;
  price: number;
  rating: number;
  students: number;
  category: string;
}

export default function CourseCard({
  id,
  title,
  description,
  image,
  instructor,
  price,
  rating,
  students,
  category,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        <Badge className="absolute right-2 top-2">{category}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="line-clamp-1 text-xl font-semibold">{title}</h3>
        <p className="line-clamp-2 mt-2 text-sm text-muted-foreground">
          {description}
        </p>
        <p className="mt-2 text-sm">Instructor: {instructor}</p>
        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="mx-2 text-xs text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">
            {students.toLocaleString()} students
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="text-lg font-bold">${price.toFixed(2)}</div>
        <Button asChild size="sm">
          <Link href={`/courses/${id}`}>View Course</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
