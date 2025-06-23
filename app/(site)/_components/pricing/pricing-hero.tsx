"use client";

import { Container } from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pricing } from "@/lib/mocks/home-page";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

const plans = [
  { key: "monthly", label: "Monthly" },
  { key: "yearly", label: "Yearly" },
] as const;
type Duration = (typeof plans)[number]["key"];
type Tier = (typeof pricing)["monthly"][number];

const PricingHero: React.FC = () => {
  const [duration, setDuration] = useState<Duration>("monthly");
  const tiers: Tier[] = pricing[duration];

  const allFeatures = Array.from(
    new Set(tiers.flatMap((tier: Tier) => tier.features))
  );

  return (
    <section className="relative w-full flex items-center justify-center py-20 md:py-32">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/30 via-accent/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tr from-chart-2/20 to-transparent rounded-full blur-2xl animate-pulse delay-500 z-0" />
      </div>
      <Container className="relative flex flex-col items-center text-center animate-fade-in z-10">
        <SectionHeading
          subtitle="Choose the plan that fits your needs. No hidden fees, cancel anytime.
          Upgrade or downgrade at any time with a single click."
        >
          Simple, Transparent Pricing
        </SectionHeading>
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
                  className="px-6 py-2 text-lg font-semibold rounded-full"
                >
                  {plan.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="w-full rounded-3xl shadow-2xl border border-border bg-card backdrop-blur-xl relative">
          <table className="w-full mx-auto divide-y divide-border text-left relative z-10">
            <thead>
              <tr>
                <th className="px-6 py-6 text-fluid-sm font-bold text-muted-foreground rounded-tl-3xl">
                  Features
                </th>
                {tiers.map((tier: Tier, idx: number) => (
                  <th
                    key={tier.plan}
                    className={`w-84 px-6 py-6 text-fluid-lg text-center font-bold text-primary-foreground relative transition-shadow duration-300 ${
                      idx === tiers.length - 1 ? "rounded-tr-3xl" : ""
                    } `}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="flex items-center text-fluid-sm gap-2">
                        {tier.plan}
                        {/* {tier.highlight && (
                          <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold animate-pulse shadow-lg border border-primary/60">
                            Popular
                          </Badge>
                        )} */}
                      </span>
                    </div>
                    <div className="mt-2 text-3xl font-semibold">
                      {tier.price}
                    </div>
                    <Button
                      className={`mt-4 w-3/4 mx-auto font-bold rounded-full shadow-xl hover:shadow-2xl transition-transform duration-200 focus:ring-4 focus:ring-primary/30 focus:outline-none`}
                    >
                      {tier.cta}
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {allFeatures.map((feature: string) => (
                <tr
                  key={feature}
                  className="transition-colors hover:bg-accent/10 group"
                >
                  <td className="px-6 py-4 font-medium text-foreground group-hover:bg-primary/5 transition-colors duration-200 rounded-l-xl">
                    {feature}
                  </td>
                  {tiers.map((tier: Tier, colIdx: number) => (
                    <td
                      key={tier.plan + feature}
                      className={`px-6 py-4 text-center transition-colors duration-200 group-hover:bg-primary/5 ${
                        tier.highlight
                          ? "bg-primary/5 group-hover:bg-primary/10"
                          : ""
                      } ${colIdx === tiers.length - 1 ? "rounded-r-xl" : ""}`}
                    >
                      {tier.features.includes(feature) ? (
                        <CheckIcon className="mx-auto text-chart-2 size-6 drop-shadow-md" />
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Decorative SVG background for extra depth */}
          <svg
            className="absolute -top-10 -right-10 opacity-20 z-0 pointer-events-none"
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="100" cy="100" r="100" fill="url(#paint0_radial)" />
          </svg>
          <svg
            className="absolute -bottom-10 -left-10 opacity-10 z-0 pointer-events-none"
            width="180"
            height="180"
            viewBox="0 0 180 180"
            fill="none"
          >
            <circle cx="90" cy="90" r="90" fill="url(#paint1_radial)" />
          </svg>
          <svg style={{ display: "none" }}>
            <defs>
              <radialGradient
                id="paint0_radial"
                cx="0"
                cy="0"
                r="1"
                gradientTransform="translate(100 100) rotate(90) scale(100)"
              >
                <stop stopColor="#6366f1" stopOpacity="0.3" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="paint1_radial"
                cx="0"
                cy="0"
                r="1"
                gradientTransform="translate(90 90) rotate(90) scale(90)"
              >
                <stop stopColor="#f472b6" stopOpacity="0.2" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
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
