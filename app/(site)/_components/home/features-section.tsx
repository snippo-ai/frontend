"use client";

import { Container } from "@/components/shared/container";
import Divider from "@/components/shared/divider";
import SectionHeading from "@/components/shared/section-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { features } from "@/lib/mocks/home-page";

// Floating decorative elements config
const floatingDecor = [
  { className: "top-4 left-8 bg-primary/30", delay: "delay-0" },
  { className: "top-1/2 right-10 bg-chart-2/30", delay: "delay-300" },
  { className: "bottom-8 left-1/3 bg-chart-3/30", delay: "delay-500" },
  { className: "bottom-4 right-8 bg-primary/20", delay: "delay-700" },
];

const FeaturesSection = () => {
  return (
    <Container
      maxWidth="6xl"
      className="relative py-12 sm:py-16 md:py-20 px-2 sm:px-6 md:px-8"
    >
      {/* Floating decorative elements (decorative only, aria-hidden) */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        {floatingDecor.map((d, i) => (
          <div
            key={d.className + d.delay}
            className={`absolute w-8 h-8 rounded-full blur-2xl animate-float-slow ${d.className} ${d.delay}`}
            style={{ animationDuration: `${4 + i}s` }}
          />
        ))}
      </div>
      {/* Section Heading with aria-labelledby for accessibility */}
      <section
        className="relative z-10"
        role="region"
        aria-labelledby="features-heading"
      >
        <SectionHeading
          as="h2"
          id="features-heading"
          subtitle="Unlock productivity, collaboration, and code quality with Snippo's powerful toolkit."
        >
          Powerful Features
        </SectionHeading>
        <Divider />
        {/* Subtle radial gradient background behind grid */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
          <div className="w-3/4 h-3/4 sm:w-2/3 sm:h-2/3 md:w-1/2 md:h-1/2 rounded-full bg-gradient-to-br from-primary/30 via-chart-2/30 to-transparent blur-2xl" />
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="group items-center text-center border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-md shadow-md hover:shadow-lg hover:-translate-y-1 hover:border-primary/70 transition-all duration-200 flex flex-col px-0 pt-0 pb-4 relative overflow-hidden"
                style={{
                  ...(typeof window !== "undefined" &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? {
                        background: "rgba(24,24,27,0.92)",
                        boxShadow: "0 4px 32px 0 rgba(30,64,175,0.10)",
                      }
                    : {}),
                }}
                role="listitem"
                aria-label={feature.title}
              >
                {/* Animated dot at top-right for modern touch */}
                <span
                  className="absolute top-3 right-4 w-2 h-2 rounded-full bg-primary/70 animate-pulse"
                  aria-hidden="true"
                />
                {/* Accent bar for visual separation */}
                <span
                  className={`block w-full h-1 ${
                    ["bg-chart-1", "bg-chart-2", "bg-chart-3", "bg-chart-5"][
                      idx % 4
                    ]
                  } rounded-t-xl mb-4`}
                  aria-hidden="true"
                />
                <CardHeader className="w-full flex flex-col items-center justify-center gap-2 px-4 md:px-8 mt-6 mb-2">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm mb-2">
                    <Icon
                      size={36}
                      aria-label={feature.title}
                      role="img"
                      focusable={false}
                      className="drop-shadow-sm"
                    />
                  </span>
                  <CardTitle className="text-base font-semibold text-foreground dark:text-white mt-1">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4">
                  <CardDescription className="text-sm text-muted-foreground min-h-[44px]">
                    {feature.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
      {/* Animations for floating elements */}
      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .delay-0 {
          animation-delay: 0s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        @keyframes scale-in {
          0% {
            transform: scaleX(0.6);
            opacity: 0;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }
      `}</style>
    </Container>
  );
};

export default FeaturesSection;
