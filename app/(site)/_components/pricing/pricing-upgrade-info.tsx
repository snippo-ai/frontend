"use client";

import { Container } from "@/components/shared/container";
import Typography from "@/components/shared/typography";
import { Button } from "@/components/ui/button";

const PricingUpgradeInfo = () => {
  return (
    <section className="w-full flex justify-center py-16 px-2 animate-fade-in">
      <Container className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-transparent rounded-3xl shadow-xl border border-border p-10 flex flex-col items-center text-center max-w-3xl">
        <Typography
          as="h2"
          fluidSize="2xl"
          className="font-bold mb-4 bg-gradient-to-r from-primary via-accent to-chart-2 bg-clip-text text-transparent"
        >
          Upgrade, Downgrade, or Cancel Anytime
        </Typography>
        <Typography
          as="p"
          fluidSize="lg"
          className="mb-8 text-muted-foreground"
        >
          You have full control over your subscription. Upgrade to Pro for
          advanced features, or downgrade to Free at any time. No hidden fees,
          no lock-in. Cancel with a single click from your dashboard.
        </Typography>
        <Button
          size="lg"
          className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-full px-10 py-6 shadow-lg hover:scale-105 transition-transform duration-200"
        >
          Manage Subscription
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

export default PricingUpgradeInfo;
