"use client";

import Divider from "@/components/shared/divider";
import Typography from "@/components/shared/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Shield, Users, Zap, ZapIcon } from "lucide-react";

type UpgradeToProCardProps = {
  variant?: "small" | "medium" | "large";
  onUpgrade?: () => void;
};

export default function UpgradeToProCard({
  variant = "medium",
  onUpgrade,
}: UpgradeToProCardProps) {
  const variants = {
    small: {
      card: "relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 border border-slate-600/50 shadow-lg dark:shadow-gray-900/50 overflow-hidden animate-fade-in group hover:shadow-xl transition-all duration-500 p-0",
      content:
        "flex flex-col items-start justify-center gap-2 px-3 py-4 relative z-10",
      badge:
        "mb-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 shadow-md flex items-center gap-1 text-fluid-xs font-bold self-start",
      title:
        "font-bold text-left bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-sm",
      description: "text-left text-slate-300 text-fluid-xs",
      button:
        "w-full font-semibold rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 shadow-md hover:from-amber-400 hover:to-yellow-300 hover:scale-[1.02] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:outline-none self-start mt-2",
      guarantee: "text-left text-slate-400 text-fluid-xs",
    },
    medium: {
      card: "relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 border border-slate-600/50 shadow-xl dark:shadow-gray-900/50 overflow-hidden animate-fade-in group hover:shadow-2xl transition-all duration-500",
      content:
        "flex flex-col items-start justify-center gap-3 px-4 py-6 sm:py-8 relative z-10",
      badge:
        "mb-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 shadow-lg flex items-center gap-1 text-fluid-sm font-bold self-start",
      title:
        "font-bold text-left bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-sm",
      description: "text-left text-slate-300 max-w-xs text-fluid-sm",
      button:
        "w-full font-bold rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 shadow-lg hover:from-amber-400 hover:to-yellow-300 hover:scale-[1.03] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:outline-none self-start",
      guarantee: "text-left text-slate-400 text-fluid-xs",
    },
    large: {
      card: "relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 border border-slate-600/50 shadow-2xl dark:shadow-gray-900/60 overflow-hidden animate-fade-in group hover:shadow-3xl transition-all duration-500",
      content:
        "flex flex-col items-start justify-center gap-4 px-6 py-8 sm:py-10 relative z-10",
      badge:
        "mb-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 shadow-xl flex items-center gap-1.5 text-fluid-base font-bold self-start",
      title:
        "font-bold text-left bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-sm",
      description: "text-left text-slate-300 max-w-sm text-fluid-base",
      button:
        "w-full font-bold rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 shadow-xl hover:from-amber-400 hover:to-yellow-300 hover:scale-[1.05] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:outline-none self-start",
      guarantee: "text-left text-slate-400 text-fluid-sm",
    },
  };

  const content = {
    small: {
      title: "Go Pro",
      description: "Unlimited private snippets & advanced features",
      buttonText: "Upgrade",
      features: [],
    },
    medium: {
      title: "Unlock Your Full Power",
      description:
        "Go beyond limits: Unlimited private snippets, advanced search, team sharing, and priority support. Upgrade now—your future self will thank you.",
      buttonText: "Upgrade to Pro",
      features: [],
    },
    large: {
      title: "Unlock the Ultimate Developer Experience",
      description:
        "Transform your workflow with enterprise-grade features designed for serious developers who demand the best.",
      buttonText: "Upgrade to Pro Now",
      features: [
        { icon: Shield, text: "Unlimited Private Snippets" },
        { icon: Search, text: "Advanced AI-Powered Search" },
        { icon: Users, text: "Team Collaboration & Sharing" },
        { icon: Zap, text: "Priority Support & Updates" },
      ],
    },
  };

  const currentVariant = variants[variant];
  const currentContent = content[variant];

  return (
    <Card
      className={currentVariant.card}
      aria-label="Upgrade to Pro Card"
      tabIndex={0}
    >
      <CardContent className={currentVariant.content}>
        {/* <Logo
          iconSize={variant === "small" ? 24 : variant === "medium" ? 32 : 40}
          hideLabel
          className="mb-2"
        /> */}
        <div className="flex items-center gap-2">
          <ZapIcon className="fill-yellow-500 text-yellow-500" />
          <Typography
            as="h3"
            fluidSize={
              variant === "small" ? "base" : variant === "medium" ? "lg" : "xl"
            }
            className={currentVariant.title}
          >
            {currentContent.title}
          </Typography>
        </div>
        <Typography
          as="p"
          fluidSize={
            variant === "small" ? "xs" : variant === "medium" ? "sm" : "base"
          }
          className={currentVariant.description}
        >
          {currentContent.description}
        </Typography>

        {variant === "large" && (
          <>
            <Divider className="my-2" />
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              {currentContent.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-fluid-sm"
                >
                  <feature.icon
                    className="size-4 text-amber-400 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-slate-300 font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
            <Divider className="my-2" />
          </>
        )}

        {variant === "medium" && <Divider className="my-2" />}

        <Button
          variant="default"
          size={variant === "small" ? "sm" : variant === "medium" ? "lg" : "lg"}
          className={currentVariant.button}
          onClick={onUpgrade}
          aria-label="Upgrade to Pro"
        >
          {currentContent.buttonText}
        </Button>

        {/* <Typography
          as="p"
          fluidSize={
            variant === "small" ? "xs" : variant === "medium" ? "xs" : "sm"
          }
          className={currentVariant.guarantee}
        >
          {variant === "small"
            ? "7-day guarantee"
            : "7-day money-back guarantee. Cancel anytime."}
        </Typography> */}
      </CardContent>
    </Card>
  );
}
