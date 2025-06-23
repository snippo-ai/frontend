"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pricing } from "@/lib/mocks/home-page";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

// Type for pricing duration
const plans = [
  { key: "monthly", label: "Monthly" },
  { key: "yearly", label: "Yearly" },
] as const;
type Duration = (typeof plans)[number]["key"];
type Tier = (typeof pricing)["monthly"][number];

const PricingTable = () => {
  const [duration, setDuration] = useState<Duration>("monthly");
  const tiers: Tier[] = pricing[duration];

  // Collect all unique features for table rows
  const allFeatures = Array.from(
    new Set(tiers.flatMap((tier: Tier) => tier.features))
  );

  return (
    <section className="w-full max-w-5xl mx-auto px-2 md:px-4 py-16 animate-fade-in">
      <div className="flex justify-center mb-8">
        <Tabs
          value={duration}
          onValueChange={(v) => setDuration(v as Duration)}
        >
          <TabsList className="bg-card/80 border shadow-md rounded-full">
            {plans.map((plan) => (
              <TabsTrigger
                key={plan.key}
                value={plan.key}
                className="px-6 py-2 text-lg font-semibold"
              >
                {plan.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className="overflow-x-auto rounded-3xl shadow-xl border border-border bg-card/80 backdrop-blur-md">
        <table className="min-w-full divide-y divide-border text-left">
          <thead>
            <tr>
              <th className="px-6 py-6 text-fluid-lg font-bold bg-gradient-to-r from-primary/30 via-accent/20 to-transparent text-primary-foreground rounded-tl-3xl">
                Features
              </th>
              {tiers.map((tier: Tier, idx: number) => (
                <th
                  key={tier.plan}
                  className={`px-6 py-6 text-fluid-lg font-bold bg-gradient-to-r from-primary/40 via-accent/30 to-transparent text-primary-foreground ${
                    idx === tiers.length - 1 ? "rounded-tr-3xl" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {tier.plan}
                    {tier.highlight && (
                      <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold animate-pulse">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div className="mt-2 text-3xl font-extrabold">
                    {tier.price}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {allFeatures.map((feature: string) => (
              <tr
                key={feature}
                className="transition-colors hover:bg-accent/10"
              >
                <td className="px-6 py-4 font-medium text-foreground">
                  {feature}
                </td>
                {tiers.map((tier: Tier) => (
                  <td
                    key={tier.plan + feature}
                    className="px-6 py-4 text-center"
                  >
                    {tier.features.includes(feature) ? (
                      <CheckIcon className="mx-auto text-primary size-6" />
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t-2 border-primary/30">
              <td className="px-6 py-6"></td>
              {tiers.map((tier: Tier) => (
                <td key={tier.plan + "cta"} className="px-6 py-6 text-center">
                  <Button
                    size="lg"
                    className={`w-full font-bold rounded-full shadow-lg bg-gradient-to-r from-primary to-accent text-primary-foreground hover:scale-105 transition-transform duration-200`}
                  >
                    {tier.cta}
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
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

export default PricingTable;
