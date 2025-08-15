"use client";

import { Fragment } from "react";
import { BillingHistorySection } from "./billing-history-section";
import { CurrentPlanSection } from "./current-plan-section";
import { PaymentMethodsSection } from "./payment-methods-section";
import { UsageMetricsSection } from "./usage-metrics-section";

export const BillingSection = () => {
  return (
    <Fragment>
      <div className="grid gap-8">
        <CurrentPlanSection />
        <UsageMetricsSection />
        <PaymentMethodsSection />
        <BillingHistorySection />
        {/* <SubscriptionDetailsSection /> */}
      </div>
    </Fragment>
  );
};
