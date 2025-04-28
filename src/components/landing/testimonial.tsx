"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

export const TestimonialSection = () => {
  const t = useTranslations("Testimonials");
  const reviews = t.raw("reviews") as Array<{
    name: string;
    role: string;
    comment: string;
    rating: number;
  }>;

  console.log(reviews);

  return (
    <section
      id="testimonials"
      className="container py-24 sm:py-32 overflow-clip"
    >
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        {t("sectionTitle")}
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-16">
        {t("heading")}
      </h2>

      <Carousel className="mx-auto w-full max-w-3xl">
        <CarouselContent dir="ltr">
          {reviews.map(({ comment, name, role, rating }, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="space-y-8 text-center">
                  <div className="flex justify-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <h3 className="text-muted-foreground text-2xl">
                    &ldquo;{comment}&rdquo;
                  </h3>
                  <div className="space-y-1">
                    <p className="text-lg font-bold">{name}</p>
                    <p className="text-muted-foreground text-sm">{role}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2" />
      </Carousel>
    </section>
  );
};
