"use client";

import { Container } from "@/components/shared/container";
import Typography from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const PricingSupportCta = () => {
  return (
    <section className="w-full flex justify-center py-16 px-2 animate-fade-in">
      <Container className="relative bg-gradient-to-br from-primary/20 via-accent/20 to-transparent rounded-3xl shadow-xl border border-border p-10 flex flex-col items-center text-center max-w-2xl">
        <Typography
          as="h2"
          fluidSize="2xl"
          className="font-bold mb-4 bg-gradient-to-r from-primary via-accent to-chart-2 bg-clip-text text-transparent"
        >
          Need Help or Have Questions?
        </Typography>
        <Typography
          as="p"
          fluidSize="lg"
          className="mb-8 text-muted-foreground"
        >
          Our support team is here to help you with any questions about plans,
          billing, or features. Reach out and we&apos;ll get back to you
          quickly.
        </Typography>
        <Button
          size="lg"
          className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-full px-10 py-6 shadow-lg hover:scale-105 transition-transform duration-200 flex items-center gap-2"
        >
          <Mail className="size-5" />
          Contact Support
        </Button>
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

export default PricingSupportCta;
