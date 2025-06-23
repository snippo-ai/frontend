import { Container } from "@/components/shared/container";
import SectionHeading from "@/components/shared/section-heading";
import Typography from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { pricing } from "@/lib/mocks/home-page";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const PricingSection: React.FC = React.memo(() => {
  const renderCards = (tiers: (typeof pricing)["monthly"]) => (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full"
      role="list"
      aria-label="Pricing plans"
    >
      {tiers.map((tier) => (
        <Card
          key={tier.plan}
          className={`relative flex flex-col items-center text-center border-2 rounded-3xl shadow-xl overflow-hidden transition-all duration-300 group min-w-0 max-w-[95vw] md:min-w-[350px] w-full
            ${
              tier.highlight
                ? "border-primary ring-2 ring-primary/70 scale-105 bg-gradient-to-br from-primary/10 via-background/80 to-accent/10 shadow-primary/30"
                : "border-border dark:border-border bg-card/80 hover:shadow-2xl"
            }
          `}
          style={{
            backdropFilter: "blur(14px)",
          }}
          role="listitem"
          aria-label={tier.plan + " plan"}
        >
          <div
            className="absolute inset-0 pointer-events-none z-0"
            aria-hidden="true"
          >
            <div
              className={`w-full h-full ${
                tier.highlight
                  ? "bg-gradient-to-br from-primary/20 via-accent/10 to-transparent animate-[spin_16s_linear_infinite]"
                  : "bg-gradient-to-br from-muted/10 to-transparent"
              } opacity-60`}
            />
          </div>
          <CardHeader className="flex flex-col items-center z-10 w-full">
            <CardTitle className="!text-fluid-2xl font-semibold mb-2 drop-shadow-lg">
              {tier.plan}
            </CardTitle>
            <div className="w-full flex justify-center mb-2">
              <span
                className={`inline-block py-3 text-fluid-2xl relative z-10`}
                aria-label={`Price: ${tier.price}`}
              >
                {tier.price}
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-0 w-full px-2 z-10 space-y-2">
            {tier.features.map((f) => (
              <div
                key={f}
                className={`flex items-center gap-2 py-2 px-4 rounded-xl transition-all duration-200 group-hover:bg-muted/30 hover:bg-accent/10 ${
                  tier.highlight ? "hover:bg-primary/10" : ""
                } justify-start text-left w-full`}
              >
                <CheckIcon
                  className={`size-6 ${
                    tier.highlight ? "text-primary" : "text-accent"
                  } drop-shadow`}
                  aria-hidden="true"
                  focusable="false"
                />
                <Typography as="span" className="text-foreground text-base">
                  {f}
                </Typography>
              </div>
            ))}
          </CardContent>
          <Link href="/pricing" className="w-4/5 mb-8 mt-4">
            <Button
              type="button"
              aria-label={`Select ${tier.plan} plan`}
              size="lg"
              className={`w-full transition-all duration-200 text-fluid-lg font-bold rounded-full shadow-xl relative overflow-hidden flex items-center justify-center gap-2
              ${
                tier.highlight
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground border-2 border-accent bg-transparent"
                  : "bg-secondary/80 text-secondary-foreground hover:bg-secondary/60 border"
              }
            `}
            >
              <span>{tier.cta}</span>
            </Button>
          </Link>
        </Card>
      ))}
    </div>
  );

  return (
    <section className="relative">
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 w-[260px] h-[260px] md:w-[420px] md:h-[420px] bg-gradient-to-br from-primary via-accent to-transparent opacity-40 blur-3xl pointer-events-none z-0 rounded-full animate-pulse"
        aria-hidden="true"
      />
      <Container className="relative w-full px-2 md:px-4 py-12 md:py-16 flex flex-col items-center overflow-hidden">
        <SectionHeading
          as="h2"
          subtitle="Choose the plan that fits your needs. No hidden fees, cancel anytime."
        >
          Simple, Transparent Pricing
        </SectionHeading>
        <Tabs
          defaultValue="monthly"
          className="w-full flex flex-col items-center mb-2"
        >
          <TabsList className="mb-8" aria-label="Pricing plan duration">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            {renderCards(pricing.monthly)}
          </TabsContent>
          <TabsContent value="yearly">
            {renderCards(pricing.yearly)}
          </TabsContent>
        </Tabs>
      </Container>
    </section>
  );
});

PricingSection.displayName = "PricingSection";

export default PricingSection;
