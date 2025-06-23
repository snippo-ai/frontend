"use client";

import { Badge } from "@/components/ui/badge";
import { pricing } from "@/lib/mocks/home-page";
import { CheckIcon, MinusIcon } from "lucide-react";

const free = pricing.monthly[0];
const pro = pricing.monthly[1];

const allFeatures = Array.from(new Set([...free.features, ...pro.features]));

const PricingComparison = () => {
  return (
    <section className="w-full max-w-4xl mx-auto px-2 md:px-4 py-16 animate-fade-in">
      <h2 className="text-fluid-2xl font-bold text-center mb-8 bg-gradient-to-r from-primary via-accent to-chart-2 bg-clip-text text-transparent">
        Free vs Pro
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-card/80 border border-border rounded-3xl shadow-xl overflow-hidden">
        <div className="p-8 flex flex-col items-center">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold">
            Free Forever
          </Badge>
          <ul className="w-full space-y-4">
            {allFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-lg">
                {free.features.includes(feature) ? (
                  <CheckIcon className="text-primary size-6" />
                ) : (
                  <MinusIcon className="text-muted-foreground size-6" />
                )}
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-8 flex flex-col items-center bg-gradient-to-br from-primary/10 via-accent/10 to-transparent">
          <Badge className="mb-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold animate-pulse">
            Pro
          </Badge>
          <ul className="w-full space-y-4">
            {allFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-lg">
                {pro.features.includes(feature) ? (
                  <CheckIcon className="text-primary size-6" />
                ) : (
                  <MinusIcon className="text-muted-foreground size-6" />
                )}
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
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

export default PricingComparison;
