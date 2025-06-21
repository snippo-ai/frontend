import Typography from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { pricing } from "@/lib/mocks/home-page";

const PricingSection = () => {
  return (
    <section className="w-full max-w-5xl px-4 py-16">
      <Typography
        as="h2"
        fluidSize="fluid-2xl"
        className="font-semibold mb-8 text-center"
      >
        Simple, Transparent Pricing
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricing.map((tier) => (
          <Card
            key={tier.plan}
            className={`flex flex-col items-center text-center border-2 ${
              tier.highlight
                ? "border-primary shadow-xl scale-105"
                : "border-zinc-200 dark:border-zinc-800"
            } transition-all`}
          >
            <CardHeader>
              <CardTitle className="text-xl mb-2">{tier.plan}</CardTitle>
              <span className="text-3xl font-bold mb-2">{tier.price}</span>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-2">
              {tier.features.map((f) => (
                <Typography as="p" key={f} className="text-muted-foreground">
                  {f}
                </Typography>
              ))}
            </CardContent>
            <Button
              size="lg"
              className={`w-4/5 mb-6 mt-2 ${
                tier.highlight
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {tier.cta}
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
