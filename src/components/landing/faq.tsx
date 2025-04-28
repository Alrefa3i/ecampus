"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

export const FAQSection = () => {
  const t = useTranslations("FAQ");

  // Get FAQ items from translations
  const questions = t.raw("questions") as Array<{
    question: string;
    answer: string;
  }>;

  const FAQList: FAQProps[] = questions.map((item, index) => ({
    question: item.question,
    answer: item.answer,
    value: `item-${index + 1}`,
  }));

  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32 mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          {t("sectionTitle")}
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          {t("heading")}
        </h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
