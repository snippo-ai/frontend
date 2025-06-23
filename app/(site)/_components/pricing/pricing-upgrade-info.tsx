"use client";

import { Container } from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import Typography from "@/components/shared/typography";
import { Button } from "@/components/ui/button";

const PricingUpgradeInfo: React.FC = () => {
  return (
    <section className="bg-transparent w-full flex justify-center py-16 px-2">
      <Container className="relative rounded-3xl shadow-xl border border-border p-10 flex flex-col items-center text-center max-w-5xl">
        <SectionHeading>Upgrade, Downgrade, or Cancel Anytime</SectionHeading>
        <Typography
          as="p"
          fluidSize="base"
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
          UPGRADE TO PRO
        </Button>
      </Container>
    </section>
  );
};

export default PricingUpgradeInfo;
