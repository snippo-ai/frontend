import { Metadata } from "next";
import PricingFaq from "../_components/pricing/pricing-faq";
import PricingHero from "../_components/pricing/pricing-hero";
import PricingSupportCta from "../_components/pricing/pricing-support-cta";
import PricingTable from "../_components/pricing/pricing-table";
import PricingUpgradeInfo from "../_components/pricing/pricing-upgrade-info";

export const metadata: Metadata = {
  title: "Pricing | Snippo AI",
  description:
    "Simple, transparent pricing for Snippo AI. Choose the plan that fits your needs. No hidden fees, cancel anytime.",
};

const PricingPage = () => {
  return (
    <main className="min-h-screen w-full bg-background text-foreground flex flex-col items-center">
      <PricingHero />
      <PricingTable />
      <PricingUpgradeInfo />
      <PricingFaq />
      <PricingSupportCta />
    </main>
  );
};

export default PricingPage;
