"use client";

import { FadeIn } from "@/components/animations";
import { Fragment } from "react";
import { BillingHistorySection } from "./billing-history-section";
import { CurrentPlanSection } from "./current-plan-section";
import { SavedCardsSection } from "./saved-cards-section";

export const BillingSection = () => {
  return (
    <Fragment>
      <div className="grid gap-8">
        <FadeIn delay={0.2}>
          <CurrentPlanSection />
        </FadeIn>
        {/* <FadeIn delay={0.4}>
          <UsageMetricsSection />
        </FadeIn> */}
        <FadeIn delay={0.4}>
          <SavedCardsSection />
        </FadeIn>
        <FadeIn delay={0.6}>
          <BillingHistorySection />
        </FadeIn>
        {/* <SubscriptionDetailsSection /> */}
      </div>
    </Fragment>
  );
};
