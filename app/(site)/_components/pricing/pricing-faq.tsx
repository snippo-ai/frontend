"use client";

import { Container } from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/mocks/home-page";

// Filter for pricing-related FAQs
const pricingFaqs = faqs.filter((faq) =>
  /price|plan|free|upgrade|cancel|support|team|secure/i.test(
    faq.question + " " + faq.answer
  )
);

const PricingFaq = () => {
  return (
    <section className="w-full px-4 py-16 flex flex-col items-center relative overflow-hidden animate-fade-in">
      {/* Animated Gradient Background */}
      <div className="absolute right-0 top-1/2 translate-y-[-50%] translate-x-1/3 w-[260px] h-[260px] md:w-[420px] md:h-[420px] bg-gradient-to-br from-primary via-accent to-transparent opacity-60 blur-3xl pointer-events-none z-0 rounded-full animate-spin-slow" />
      <Container>
        <SectionHeading as="h2" subtitle="Answers to common pricing questions.">
          Pricing FAQs
        </SectionHeading>
        <Accordion
          type="single"
          collapsible
          className="w-full rounded-2xl bg-card/80 border shadow-md divide-y z-10 relative mt-8"
        >
          {pricingFaqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="!text-lg font-semibold text-primary-foreground p-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed px-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>
    </section>
  );
};

export default PricingFaq;
