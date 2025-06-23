"use client";

import { Container } from "@/components/shared/container";
import Typography from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const PricingHero = () => {
  return (
    <section className="relative w-full flex items-center justify-center py-20 md:py-32 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/30 via-accent/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tr from-chart-2/20 to-transparent rounded-full blur-2xl animate-pulse delay-500" />
      </div>
      <Container className="relative z-10 flex flex-col items-center text-center animate-fade-in">
        <Typography
          as="h1"
          fluidSize="4xl"
          className="font-bold mb-4 bg-gradient-to-r from-primary via-accent to-chart-2 bg-clip-text text-transparent"
        >
          Simple, Transparent Pricing
        </Typography>
        <Typography
          as="p"
          fluidSize="lg"
          className="mb-8 text-muted-foreground max-w-2xl"
        >
          Choose the plan that fits your needs. No hidden fees, cancel anytime.
          Upgrade or downgrade at any time with a single click.
        </Typography>
        <Button
          size="lg"
          className="px-10 py-6 font-semibold bg-gradient-to-br from-primary to-accent border-0 shadow-xl hover:scale-105 hover:shadow-primary/30 transition-transform duration-200 rounded-full"
        >
          Get Started
          <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
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

export default PricingHero;
