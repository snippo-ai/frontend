"use client";

import { AnimatedSection, FadeIn } from "@/components/animations";
import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";
import { Fragment } from "react";
import MainContentHeader from "../_components/main-content-header";
import { BillingSection } from "./_components/billing-section";

const BillingPage = () => {
  return (
    <Fragment>
      <AnimatedSection aria-labelledby="billing-section-heading" delay={0.1}>
        <h2 id="billing-section-heading" className="sr-only">
          Billing Settings
        </h2>
        <FadeIn delay={0.2} direction="up">
          <MainContentHeader
            title="Billing & Subscription"
            description="Manage your subscription, payment methods, and billing history."
            icon={CreditCard}
          />
        </FadeIn>
        <FadeIn delay={0.3} direction="up">
          <Separator className="my-4 mb-6" />
        </FadeIn>
        <FadeIn delay={0.4} direction="up">
          <BillingSection />
        </FadeIn>
      </AnimatedSection>
    </Fragment>
  );
};

export default BillingPage;
